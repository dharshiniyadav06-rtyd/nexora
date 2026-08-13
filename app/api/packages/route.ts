import { NextRequest, NextResponse } from 'next/server';
import { getPackages, createPackage, getPackageById } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort'); // e.g. price, name, photographer_count, status
    const order = searchParams.get('order') || 'asc'; // asc or desc
    
    const packages = getPackages();
    
    // Support sorting
    if (sort) {
      packages.sort((a, b) => {
        let valA: any = a[sort as keyof typeof a];
        let valB: any = b[sort as keyof typeof b];
        
        if (sort === 'price') {
          // Parse price string e.g. ₹1,20,000 -> 120000
          valA = parseInt(String(valA).replace(/[₹,]/g, ''), 10) || 0;
          valB = parseInt(String(valB).replace(/[₹,]/g, ''), 10) || 0;
        } else if (sort === 'photographer_count') {
          valA = Number(valA) || 0;
          valB = Number(valB) || 0;
        } else {
          valA = String(valA || '').toLowerCase();
          valB = String(valB || '').toLowerCase();
        }
        
        if (valA < valB) return order === 'desc' ? 1 : -1;
        if (valA > valB) return order === 'desc' ? -1 : 1;
        return 0;
      });
    } else {
      // Default ordering: tier progression based on price ascending
      packages.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[₹,]/g, ''), 10) || 0;
        const priceB = parseInt(b.price.replace(/[₹,]/g, ''), 10) || 0;
        return priceA - priceB;
      });
    }
    
    return NextResponse.json(packages);
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'duration', 'photographer_count'];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    if (typeof body.photographer_count !== 'number' || body.photographer_count < 0) {
      return NextResponse.json({ error: 'photographer_count must be a non-negative number' }, { status: 400 });
    }
    
    let includedServicesStr = '[]';
    if (body.included_services) {
      if (Array.isArray(body.included_services)) {
        includedServicesStr = JSON.stringify(body.included_services);
      } else if (typeof body.included_services === 'string') {
        try {
          const parsed = JSON.parse(body.included_services);
          if (!Array.isArray(parsed)) {
            return NextResponse.json({ error: 'included_services must be an array or JSON string of array' }, { status: 400 });
          }
          includedServicesStr = body.included_services;
        } catch {
          return NextResponse.json({ error: 'included_services must be a valid JSON array string' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'included_services must be an array or JSON string of array' }, { status: 400 });
      }
    }

    const pkgId = body.id || `pkg-${Math.random().toString(36).substring(2, 11)}`;
    
    // Check if ID already exists to avoid SQL constraints violation
    const existing = getPackageById(pkgId);
    if (existing) {
      return NextResponse.json({ error: `Package with ID ${pkgId} already exists` }, { status: 409 });
    }

    const newPackage = {
      id: pkgId,
      name: body.name,
      description: body.description,
      price: body.price,
      duration: body.duration,
      photographer_count: body.photographer_count,
      included_services: includedServicesStr,
      status: body.status || 'active'
    };

    createPackage(newPackage);
    
    // Fetch from database to return full record including created_at, updated_at
    const createdPkg = getPackageById(pkgId);
    return NextResponse.json(createdPkg, { status: 201 });
  } catch (error: any) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: error.message || 'Failed to create package' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getPackageById, updatePackage, deletePackage } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const pkg = getPackageById(id);
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json(pkg);
  } catch (error: any) {
    console.error(`Error fetching package ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to fetch package' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const existingPkg = getPackageById(id);
    if (!existingPkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const body = await request.json();

    // Fields to update
    const updates: any = {};

    if (body.name !== undefined) {
      if (body.name === null || body.name === '') {
        return NextResponse.json({ error: 'name cannot be empty' }, { status: 400 });
      }
      updates.name = body.name;
    }

    if (body.description !== undefined) {
      if (body.description === null || body.description === '') {
        return NextResponse.json({ error: 'description cannot be empty' }, { status: 400 });
      }
      updates.description = body.description;
    }

    if (body.price !== undefined) {
      if (body.price === null || body.price === '') {
        return NextResponse.json({ error: 'price cannot be empty' }, { status: 400 });
      }
      updates.price = body.price;
    }

    if (body.duration !== undefined) {
      if (body.duration === null || body.duration === '') {
        return NextResponse.json({ error: 'duration cannot be empty' }, { status: 400 });
      }
      updates.duration = body.duration;
    }

    if (body.photographer_count !== undefined) {
      if (typeof body.photographer_count !== 'number' || body.photographer_count < 0) {
        return NextResponse.json({ error: 'photographer_count must be a non-negative number' }, { status: 400 });
      }
      updates.photographer_count = body.photographer_count;
    }

    if (body.included_services !== undefined) {
      if (Array.isArray(body.included_services)) {
        updates.included_services = JSON.stringify(body.included_services);
      } else if (typeof body.included_services === 'string') {
        try {
          const parsed = JSON.parse(body.included_services);
          if (!Array.isArray(parsed)) {
            return NextResponse.json({ error: 'included_services must be an array or JSON string of array' }, { status: 400 });
          }
          updates.included_services = body.included_services;
        } catch {
          return NextResponse.json({ error: 'included_services must be a valid JSON array string' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'included_services must be an array or JSON string of array' }, { status: 400 });
      }
    }

    if (body.status !== undefined) {
      if (body.status !== 'active' && body.status !== 'inactive') {
        return NextResponse.json({ error: 'status must be active or inactive' }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
    }

    const updated = updatePackage(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
    }

    const updatedPkg = getPackageById(id);
    return NextResponse.json(updatedPkg);
  } catch (error: any) {
    console.error(`Error updating package ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = '';
  try {
    id = (await params).id;
    const deleted = deletePackage(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error: any) {
    console.error(`Error deleting package ${id}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete package' }, { status: 500 });
  }
}

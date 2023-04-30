import supabase from '@/lib/supabase';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  if (!form) return NextResponse.json({ status: 400 });

  const payload = z.string().trim().nonempty().safeParse(form.get('query'));
  if (!payload.success) return NextResponse.json({ status: 400 });

  const { data: posts, error } = await supabase
    .from('post')
    .select('slug, title, pub_date, site(slug, name)')
    .textSearch('fts', `'${payload.data}'`)
    .limit(30);

  return error
    ? NextResponse.json({ status: 500 })
    : NextResponse.json({ status: 200, posts });
}

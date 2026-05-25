import { createClient } from '@supabase/supabase-js'

// Storage 전용 클라이언트 (API Routes에서 사용)
export function createStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.")
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

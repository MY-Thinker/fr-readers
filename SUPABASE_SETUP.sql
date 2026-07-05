-- ============================================================
-- 丰润区 2026 全域阅读活动 - Supabase 初始化脚本
-- ============================================================
-- 在 Supabase 控制台 → SQL Editor 中执行本脚本
-- ============================================================

-- 1) 创建专家视频元数据表
create table if not exists public.expert_videos (
  id           text primary key,
  title        text not null,
  speaker      text not null,
  video_path   text not null,            -- Storage 中视频文件路径
  cover_path   text,                     -- Storage 中封面图路径（可空）
  duration     text,                     -- 时长字符串，例 "1:23:45"
  uploaded_at  timestamptz not null default now()
);

-- 时间倒序索引
create index if not exists expert_videos_uploaded_at_idx
  on public.expert_videos (uploaded_at desc);

-- 启用行级安全
alter table public.expert_videos enable row level security;

-- 2) RLS 策略
--    匿名（anon）角色：可读所有视频；可插入/删除（前端密码已作保护层，如需更严格
--    请改用邮箱密码登录后再写入）
drop policy if exists "videos_read_all" on public.expert_videos;
create policy "videos_read_all"
  on public.expert_videos
  for select
  to anon, authenticated
  using (true);

drop policy if exists "videos_insert_all" on public.expert_videos;
create policy "videos_insert_all"
  on public.expert_videos
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "videos_delete_all" on public.expert_videos;
create policy "videos_delete_all"
  on public.expert_videos
  for delete
  to anon, authenticated
  using (true);

-- 3) 创建存储桶：视频 + 封面
insert into storage.buckets (id, name, public)
values ('expert-videos', 'expert-videos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('expert-covers', 'expert-covers', true)
on conflict (id) do nothing;

-- 4) Storage 对象的 RLS 策略（允许匿名读 + 写）
-- expert-videos
drop policy if exists "expert_videos_read" on storage.objects;
create policy "expert_videos_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'expert-videos');

drop policy if exists "expert_videos_insert" on storage.objects;
create policy "expert_videos_insert"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'expert-videos');

drop policy if exists "expert_videos_delete" on storage.objects;
create policy "expert_videos_delete"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'expert-videos');

-- expert-covers
drop policy if exists "expert_covers_read" on storage.objects;
create policy "expert_covers_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'expert-covers');

drop policy if exists "expert_covers_insert" on storage.objects;
create policy "expert_covers_insert"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'expert-covers');

drop policy if exists "expert_covers_delete" on storage.objects;
create policy "expert_covers_delete"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'expert-covers');

-- ============================================================
-- 执行完毕。返回前端 /admin/videos 即可上传视频
-- ============================================================

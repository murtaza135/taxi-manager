CREATE POLICY "Give users access to own folder for select 1zo3d_0"
ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'main' AND (select auth.uid()::text) = (storage.foldername(name))[1]);

CREATE POLICY "Give users access to own folder for insert 1zo3d_1"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'main' AND (select auth.uid()::text) = (storage.foldername(name))[1]);

CREATE POLICY "Give users access to own folder for update 1zo3d_2"
ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'main' AND (select auth.uid()::text) = (storage.foldername(name))[1]);

CREATE POLICY "Give users access to own folder for delete 1zo3d_3"
ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'main' AND (select auth.uid()::text) = (storage.foldername(name))[1]);

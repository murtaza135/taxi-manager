CREATE POLICY "Give any user insert access to the guest folder 1zo3d_0"
ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'main' AND (storage.foldername(name))[1] = 'guest');

CREATE POLICY "Give users authenticated access to guest folder 1zo3d_0" 
ON storage.objects 
FOR SELECT TO public 
USING (bucket_id = 'main' AND (storage.foldername(name))[1] = 'guest' AND auth.role() = 'authenticated');

CREATE POLICY "Give users authenticated access to guest folder 1zo3d_1" 
ON storage.objects 
FOR UPDATE TO public 
USING (bucket_id = 'main' AND (storage.foldername(name))[1] = 'guest' AND auth.role() = 'authenticated');

CREATE POLICY "Give users authenticated access to guest folder 1zo3d_2" 
ON storage.objects 
FOR DELETE TO public 
USING (bucket_id = 'main' AND (storage.foldername(name))[1] = 'guest' AND auth.role() = 'authenticated');

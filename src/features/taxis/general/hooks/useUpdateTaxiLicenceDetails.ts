import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevalidator } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import isEmpty from 'lodash/isEmpty';
import { supabase } from '@/config/api/supabaseClient';
import { queryClient as globalQueryClient } from '@/config/api/queryClient';
import { sessionOptions } from '@/features/auth/hooks/useSession';
import { SupabaseError } from '@/errors/classes/SupabaseError';
import { useToast } from '@/ui/toast';
import { Tables } from '@/types/database';
import { Prettify } from '@/types/utils';
import { compressImage } from '@/utils/compression/compressImage';

// TODO make simpler

export type Variables = Prettify<
  Partial<
    Pick<
      Tables<'taxi_licence'>,
      | 'compliance_certificate_licence_number' | 'phc_number'
      | 'start_date' | 'end_date'
    >
  > & {
    id: number;
    compliance_certificate_document?: File | null | undefined;
    phc_licence_document?: File | null | undefined;
  }
>;

export async function updateTaxiLicenceDetails({
  id,
  compliance_certificate_document,
  phc_licence_document,
  ...vars
}: Variables) {
  const session = await globalQueryClient.ensureQueryData(sessionOptions());

  if (!isEmpty(vars)) {
    const { error, status } = await supabase
      .from('taxi_licence')
      .update(vars)
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (error) {
      throw new SupabaseError(error, status, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  }

  const {
    data: documentsSelectData,
    error: documentsSelectError,
    status: documentsSelectStatus,
  } = await supabase
    .from('taxi_licence')
    .select('compliance_certificate_document_path, phc_licence_document_path')
    .eq('auth_id', session.user.id)
    .eq('id', id)
    .limit(1)
    .single();

  if (documentsSelectError) {
    throw new SupabaseError(documentsSelectError, documentsSelectStatus, {
      globalTitle: 'Could not update taxi licence',
    });
  }

  if (compliance_certificate_document
    && !documentsSelectData.compliance_certificate_document_path) {
    /* add compliance_certificate_document */
    const document_path = `${session.user.id}/compliance-certificates/${uuidv4()}`;
    const compressedDocument = await compressImage(
      compliance_certificate_document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(document_path, compressedDocument, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('taxi_licence')
      .update({ compliance_certificate_document_path: document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  } else if (compliance_certificate_document
    && documentsSelectData.compliance_certificate_document_path) {
    /* replace compliance_certificate_document */
    const compressedDocument = await compressImage(
      compliance_certificate_document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .update(
        documentsSelectData.compliance_certificate_document_path,
        compressedDocument,
        { upsert: true },
      );

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  } else if (compliance_certificate_document === null
    && documentsSelectData.compliance_certificate_document_path) {
    /* delete compliance_certificate_document */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.compliance_certificate_document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('taxi_licence')
      .update({ compliance_certificate_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  }

  if (phc_licence_document
    && !documentsSelectData.phc_licence_document_path) {
    /* add phc_licence_document */
    const document_path = `${session.user.id}/phc-licences/${uuidv4()}`;
    const compressedDocument = await compressImage(
      phc_licence_document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .upload(document_path, compressedDocument, { upsert: true });

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('taxi_licence')
      .update({ phc_licence_document_path: document_path })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  } else if (phc_licence_document
    && documentsSelectData.phc_licence_document_path) {
    /* replace phc_licence_document */
    const compressedDocument = await compressImage(
      phc_licence_document,
      { maxWidth: 150, maxHeight: 150 },
    );

    const { error: documentError } = await supabase
      .storage
      .from('main')
      .update(
        documentsSelectData.phc_licence_document_path,
        compressedDocument,
        { upsert: true },
      );

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  } else if (phc_licence_document === null
    && documentsSelectData.phc_licence_document_path) {
    /* delete phc_licence_document */
    const { error: documentError } = await supabase
      .storage
      .from('main')
      .remove([documentsSelectData.phc_licence_document_path]);

    if (documentError) {
      throw new SupabaseError(documentError, null, {
        globalTitle: 'Could not update taxi licence',
      });
    }

    const { error: documentPathError, status: documentPathStatus } = await supabase
      .from('taxi_licence')
      .update({ phc_licence_document_path: null })
      .eq('auth_id', session.user.id)
      .eq('id', id);

    if (documentPathError) {
      throw new SupabaseError(documentPathError, documentPathStatus, {
        globalTitle: 'Could not update taxi licence',
      });
    }
  }
}

export function useUpdateTaxiLicenceDetails() {
  const queryClient = useQueryClient();
  const { revalidate } = useRevalidator();
  const { toast } = useToast();

  const mutation = useMutation<void, SupabaseError, Variables>({
    mutationFn: updateTaxiLicenceDetails,
    onSuccess: async (_data, { id, compliance_certificate_document, phc_licence_document }) => {
      if (compliance_certificate_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['taxis', id, 'licence', 'complianceCertificate'] });
      }

      if (phc_licence_document !== undefined) {
        queryClient.removeQueries({ queryKey: ['taxis', id, 'licence', 'phcLicence'] });
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['taxis', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['taxis', id, 'licence'], exact: true }),
      ]);
      revalidate();
    },
    onError: (error) => {
      toast({
        title: error.title,
        description: error.description,
        variant: 'destructive',
      });
    },
  });

  return mutation;
}

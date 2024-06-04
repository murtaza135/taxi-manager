export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      company: {
        Row: {
          address: string
          auth_id: string
          company_number: string
          created_at: string
          email: string
          id: number
          logo_path: string | null
          name: string
          phone_number: string | null
        }
        Insert: {
          address: string
          auth_id?: string
          company_number: string
          created_at?: string
          email: string
          id?: number
          logo_path?: string | null
          name: string
          phone_number?: string | null
        }
        Update: {
          address?: string
          auth_id?: string
          company_number?: string
          created_at?: string
          email?: string
          id?: number
          logo_path?: string | null
          name?: string
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      council_application: {
        Row: {
          auth_id: string
          created_at: string
          document_path: string
          id: number
          taxi_id: number
        }
        Insert: {
          auth_id?: string
          created_at?: string
          document_path: string
          id?: number
          taxi_id: number
        }
        Update: {
          auth_id?: string
          created_at?: string
          document_path?: string
          id?: number
          taxi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "council_application_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_application_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxi"
            referencedColumns: ["id"]
          },
        ]
      }
      council_application_receipt: {
        Row: {
          auth_id: string
          created_at: string
          document_path: string
          id: number
          taxi_id: number
        }
        Insert: {
          auth_id?: string
          created_at?: string
          document_path: string
          id?: number
          taxi_id: number
        }
        Update: {
          auth_id?: string
          created_at?: string
          document_path?: string
          id?: number
          taxi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "council_application_receipt_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_application_receipt_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxi"
            referencedColumns: ["id"]
          },
        ]
      }
      driver: {
        Row: {
          active_drivers_licence_id: number | null
          active_drivers_taxi_badge_id: number | null
          active_hire_agreement_id: number | null
          active_insurance_id: number | null
          auth_id: string
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_names: string
          id: number
          is_retired: boolean
          last_name: string
          national_insurance_number: string | null
          phone_number: string | null
          picture_path: string | null
        }
        Insert: {
          active_drivers_licence_id?: number | null
          active_drivers_taxi_badge_id?: number | null
          active_hire_agreement_id?: number | null
          active_insurance_id?: number | null
          auth_id?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_names: string
          id?: number
          is_retired?: boolean
          last_name: string
          national_insurance_number?: string | null
          phone_number?: string | null
          picture_path?: string | null
        }
        Update: {
          active_drivers_licence_id?: number | null
          active_drivers_taxi_badge_id?: number | null
          active_hire_agreement_id?: number | null
          active_insurance_id?: number | null
          auth_id?: string
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_names?: string
          id?: number
          is_retired?: boolean
          last_name?: string
          national_insurance_number?: string | null
          phone_number?: string | null
          picture_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_active_drivers_licence_id_fkey"
            columns: ["active_drivers_licence_id"]
            isOneToOne: false
            referencedRelation: "drivers_licence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_active_drivers_taxi_badge_id_fkey"
            columns: ["active_drivers_taxi_badge_id"]
            isOneToOne: false
            referencedRelation: "drivers_taxi_badge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_active_hire_agreement_id_fkey"
            columns: ["active_hire_agreement_id"]
            isOneToOne: false
            referencedRelation: "hire_agreement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_active_insurance_id_fkey"
            columns: ["active_insurance_id"]
            isOneToOne: false
            referencedRelation: "insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_application: {
        Row: {
          auth_id: string
          company_id: number
          created_at: string
          date_of_birth: string | null
          drivers_licence_end_date: string | null
          drivers_licence_number: string | null
          drivers_licence_path: string | null
          drivers_licence_start_date: string | null
          email: string | null
          first_names: string | null
          id: string
          last_name: string | null
          national_insurance_number: string | null
          phone_number: string | null
          picture_path: string | null
          taxi_badge_end_date: string | null
          taxi_badge_number: string | null
          taxi_badge_path: string | null
          taxi_badge_start_date: string | null
        }
        Insert: {
          auth_id?: string
          company_id: number
          created_at?: string
          date_of_birth?: string | null
          drivers_licence_end_date?: string | null
          drivers_licence_number?: string | null
          drivers_licence_path?: string | null
          drivers_licence_start_date?: string | null
          email?: string | null
          first_names?: string | null
          id?: string
          last_name?: string | null
          national_insurance_number?: string | null
          phone_number?: string | null
          picture_path?: string | null
          taxi_badge_end_date?: string | null
          taxi_badge_number?: string | null
          taxi_badge_path?: string | null
          taxi_badge_start_date?: string | null
        }
        Update: {
          auth_id?: string
          company_id?: number
          created_at?: string
          date_of_birth?: string | null
          drivers_licence_end_date?: string | null
          drivers_licence_number?: string | null
          drivers_licence_path?: string | null
          drivers_licence_start_date?: string | null
          email?: string | null
          first_names?: string | null
          id?: string
          last_name?: string | null
          national_insurance_number?: string | null
          phone_number?: string | null
          picture_path?: string | null
          taxi_badge_end_date?: string | null
          taxi_badge_number?: string | null
          taxi_badge_path?: string | null
          taxi_badge_start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_application_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_application_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers_licence: {
        Row: {
          auth_id: string
          created_at: string
          document_path: string | null
          driver_id: number
          end_date: string
          id: number
          licence_number: string
          start_date: string
        }
        Insert: {
          auth_id?: string
          created_at?: string
          document_path?: string | null
          driver_id: number
          end_date: string
          id?: number
          licence_number: string
          start_date: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          document_path?: string | null
          driver_id?: number
          end_date?: string
          id?: number
          licence_number?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_licence_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_licence_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers_taxi_badge: {
        Row: {
          auth_id: string
          badge_number: string
          created_at: string
          document_path: string | null
          driver_id: number
          end_date: string
          id: number
          start_date: string | null
        }
        Insert: {
          auth_id?: string
          badge_number: string
          created_at?: string
          document_path?: string | null
          driver_id: number
          end_date: string
          id?: number
          start_date?: string | null
        }
        Update: {
          auth_id?: string
          badge_number?: string
          created_at?: string
          document_path?: string | null
          driver_id?: number
          end_date?: string
          id?: number
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_taxi_badge_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_taxi_badge_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver"
            referencedColumns: ["id"]
          },
        ]
      }
      employee: {
        Row: {
          auth_id: string
          company_id: number
          created_at: string
          date_of_birth: string
          email: string
          first_names: string
          id: number
          last_name: string
          national_insurance_number: string
          phone_number: string | null
          picture_path: string | null
          signature_path: string | null
        }
        Insert: {
          auth_id?: string
          company_id: number
          created_at?: string
          date_of_birth: string
          email: string
          first_names: string
          id?: number
          last_name: string
          national_insurance_number: string
          phone_number?: string | null
          picture_path?: string | null
          signature_path?: string | null
        }
        Update: {
          auth_id?: string
          company_id?: number
          created_at?: string
          date_of_birth?: string
          email?: string
          first_names?: string
          id?: number
          last_name?: string
          national_insurance_number?: string
          phone_number?: string | null
          picture_path?: string | null
          signature_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      hire_agreement: {
        Row: {
          auth_id: string
          contract_document_path: string | null
          created_at: string
          deposit_amount: number
          deposit_receipt_document_path: string | null
          driver_id: number
          end_date: string | null
          id: number
          is_retired: boolean
          permission_letter_document_path: string | null
          rent_amount: number
          start_date: string
          taxi_id: number
        }
        Insert: {
          auth_id?: string
          contract_document_path?: string | null
          created_at?: string
          deposit_amount: number
          deposit_receipt_document_path?: string | null
          driver_id: number
          end_date?: string | null
          id?: number
          is_retired?: boolean
          permission_letter_document_path?: string | null
          rent_amount: number
          start_date: string
          taxi_id: number
        }
        Update: {
          auth_id?: string
          contract_document_path?: string | null
          created_at?: string
          deposit_amount?: number
          deposit_receipt_document_path?: string | null
          driver_id?: number
          end_date?: string | null
          id?: number
          is_retired?: boolean
          permission_letter_document_path?: string | null
          rent_amount?: number
          start_date?: string
          taxi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "hire_agreement_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hire_agreement_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hire_agreement_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxi"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance: {
        Row: {
          auth_id: string
          created_at: string
          document_path: string | null
          driver_id: number | null
          end_date: string
          id: number
          is_any_driver: boolean
          policy_number: string
          start_date: string
          taxi_id: number
        }
        Insert: {
          auth_id?: string
          created_at?: string
          document_path?: string | null
          driver_id?: number | null
          end_date: string
          id?: number
          is_any_driver: boolean
          policy_number: string
          start_date: string
          taxi_id: number
        }
        Update: {
          auth_id?: string
          created_at?: string
          document_path?: string | null
          driver_id?: number | null
          end_date?: string
          id?: number
          is_any_driver?: boolean
          policy_number?: string
          start_date?: string
          taxi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "insurance_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxi"
            referencedColumns: ["id"]
          },
        ]
      }
      picture: {
        Row: {
          auth_id: string
          created_at: string
          hire_id: number
          id: number
          is_before_hire: boolean
          picture_path: string
        }
        Insert: {
          auth_id?: string
          created_at?: string
          hire_id: number
          id?: number
          is_before_hire?: boolean
          picture_path: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          hire_id?: number
          id?: number
          is_before_hire?: boolean
          picture_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "picture_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "picture_hire_id_fkey"
            columns: ["hire_id"]
            isOneToOne: false
            referencedRelation: "hire_agreement"
            referencedColumns: ["id"]
          },
        ]
      }
      rent: {
        Row: {
          amount: number
          auth_id: string
          created_at: string
          end_date: string
          hire_id: number
          id: number
          is_paid: boolean
          receipt_document_path: string | null
          start_date: string
        }
        Insert: {
          amount: number
          auth_id?: string
          created_at?: string
          end_date: string
          hire_id: number
          id?: number
          is_paid?: boolean
          receipt_document_path?: string | null
          start_date: string
        }
        Update: {
          amount?: number
          auth_id?: string
          created_at?: string
          end_date?: string
          hire_id?: number
          id?: number
          is_paid?: boolean
          receipt_document_path?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "rent_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rent_hire_id_fkey"
            columns: ["hire_id"]
            isOneToOne: false
            referencedRelation: "hire_agreement"
            referencedColumns: ["id"]
          },
        ]
      }
      taxi: {
        Row: {
          active_hire_agreement_id: number | null
          active_insurance_id: number | null
          active_taxi_licence_id: number | null
          auth_id: string
          chassis_number: string
          colour: string
          created_at: string
          expected_expiry_date: string | null
          id: number
          is_retired: boolean
          logbook_document_path: string | null
          number_plate: string
          picture_path: string | null
          registration_date: string | null
          road_tax_expiry_date: string | null
          vehicle_id: number
        }
        Insert: {
          active_hire_agreement_id?: number | null
          active_insurance_id?: number | null
          active_taxi_licence_id?: number | null
          auth_id?: string
          chassis_number: string
          colour: string
          created_at?: string
          expected_expiry_date?: string | null
          id?: number
          is_retired?: boolean
          logbook_document_path?: string | null
          number_plate: string
          picture_path?: string | null
          registration_date?: string | null
          road_tax_expiry_date?: string | null
          vehicle_id: number
        }
        Update: {
          active_hire_agreement_id?: number | null
          active_insurance_id?: number | null
          active_taxi_licence_id?: number | null
          auth_id?: string
          chassis_number?: string
          colour?: string
          created_at?: string
          expected_expiry_date?: string | null
          id?: number
          is_retired?: boolean
          logbook_document_path?: string | null
          number_plate?: string
          picture_path?: string | null
          registration_date?: string | null
          road_tax_expiry_date?: string | null
          vehicle_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "taxi_active_hire_agreement_id_fkey"
            columns: ["active_hire_agreement_id"]
            isOneToOne: false
            referencedRelation: "hire_agreement"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxi_active_insurance_id_fkey"
            columns: ["active_insurance_id"]
            isOneToOne: false
            referencedRelation: "insurance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxi_active_taxi_licence_id_fkey"
            columns: ["active_taxi_licence_id"]
            isOneToOne: false
            referencedRelation: "taxi_licence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxi_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxi_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicle"
            referencedColumns: ["id"]
          },
        ]
      }
      taxi_licence: {
        Row: {
          auth_id: string
          compliance_certificate_document_path: string | null
          compliance_certificate_licence_number: string
          created_at: string
          end_date: string
          id: number
          phc_licence_document_path: string | null
          phc_number: string
          start_date: string | null
          taxi_id: number
        }
        Insert: {
          auth_id?: string
          compliance_certificate_document_path?: string | null
          compliance_certificate_licence_number: string
          created_at?: string
          end_date: string
          id?: number
          phc_licence_document_path?: string | null
          phc_number: string
          start_date?: string | null
          taxi_id: number
        }
        Update: {
          auth_id?: string
          compliance_certificate_document_path?: string | null
          compliance_certificate_licence_number?: string
          created_at?: string
          end_date?: string
          id?: number
          phc_licence_document_path?: string | null
          phc_number?: string
          start_date?: string | null
          taxi_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "taxi_licence_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxi_licence_taxi_id_fkey"
            columns: ["taxi_id"]
            isOneToOne: false
            referencedRelation: "taxi"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle: {
        Row: {
          auth_id: string
          cc: number | null
          created_at: string
          fuel_type: string | null
          id: number
          make: string
          model: string
        }
        Insert: {
          auth_id?: string
          cc?: number | null
          created_at?: string
          fuel_type?: string | null
          id?: number
          make: string
          model: string
        }
        Update: {
          auth_id?: string
          cc?: number | null
          created_at?: string
          fuel_type?: string | null
          id?: number
          make?: string
          model?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehiclee_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

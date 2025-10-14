export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
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
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
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
      actividades: {
        Row: {
          costo_adicional: number | null
          created_at: string | null
          created_by: string | null
          cupo_maximo: number | null
          deleted_at: string | null
          descripcion: string | null
          id_actividad: number
          id_instalacion: number | null
          id_instructor: number | null
          nombre: string
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          costo_adicional?: number | null
          created_at?: string | null
          created_by?: string | null
          cupo_maximo?: number | null
          deleted_at?: string | null
          descripcion?: string | null
          id_actividad?: number
          id_instalacion?: number | null
          id_instructor?: number | null
          nombre: string
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          costo_adicional?: number | null
          created_at?: string | null
          created_by?: string | null
          cupo_maximo?: number | null
          deleted_at?: string | null
          descripcion?: string | null
          id_actividad?: number
          id_instalacion?: number | null
          id_instructor?: number | null
          nombre?: string
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actividades_id_instalacion_fkey"
            columns: ["id_instalacion"]
            isOneToOne: false
            referencedRelation: "instalaciones"
            referencedColumns: ["id_instalacion"]
          },
          {
            foreignKeyName: "actividades_id_instructor_fkey"
            columns: ["id_instructor"]
            isOneToOne: false
            referencedRelation: "personal"
            referencedColumns: ["id_personal"]
          },
        ]
      }
      inscripciones: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          estado: string | null
          fecha_inscripcion: string | null
          id_actividad: number
          id_inscripcion: number
          id_miembro: number
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha_inscripcion?: string | null
          id_actividad: number
          id_inscripcion?: number
          id_miembro: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha_inscripcion?: string | null
          id_actividad?: number
          id_inscripcion?: number
          id_miembro?: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inscripciones_id_actividad_fkey"
            columns: ["id_actividad"]
            isOneToOne: false
            referencedRelation: "actividades"
            referencedColumns: ["id_actividad"]
          },
          {
            foreignKeyName: "inscripciones_id_miembro_fkey"
            columns: ["id_miembro"]
            isOneToOne: false
            referencedRelation: "miembros"
            referencedColumns: ["id_miembro"]
          },
        ]
      }
      instalaciones: {
        Row: {
          capacidad: number | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          estado: string | null
          id_instalacion: number
          nombre: string
          tenant_id: string | null
          tipo: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          capacidad?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          id_instalacion?: number
          nombre: string
          tenant_id?: string | null
          tipo?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          capacidad?: number | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          id_instalacion?: number
          nombre?: string
          tenant_id?: string | null
          tipo?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      miembros: {
        Row: {
          apellido: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          direccion: string | null
          dni_cedula: string | null
          email: string
          estado: string | null
          fecha_alta: string | null
          fecha_nacimiento: string | null
          id_miembro: number
          id_tipo_membresia: number | null
          nombre: string
          telefono: string | null
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          apellido: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          direccion?: string | null
          dni_cedula?: string | null
          email: string
          estado?: string | null
          fecha_alta?: string | null
          fecha_nacimiento?: string | null
          id_miembro?: number
          id_tipo_membresia?: number | null
          nombre: string
          telefono?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          apellido?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          direccion?: string | null
          dni_cedula?: string | null
          email?: string
          estado?: string | null
          fecha_alta?: string | null
          fecha_nacimiento?: string | null
          id_miembro?: number
          id_tipo_membresia?: number | null
          nombre?: string
          telefono?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miembros_id_tipo_membresia_fkey"
            columns: ["id_tipo_membresia"]
            isOneToOne: false
            referencedRelation: "tipos_de_membresia"
            referencedColumns: ["id_tipo_membresia"]
          },
        ]
      }
      pagos: {
        Row: {
          concepto: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          estado: string | null
          fecha_pago: string | null
          id_miembro: number
          id_pago: number
          metodo_pago: string | null
          monto: number
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          concepto?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha_pago?: string | null
          id_miembro: number
          id_pago?: number
          metodo_pago?: string | null
          monto: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          concepto?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha_pago?: string | null
          id_miembro?: number
          id_pago?: number
          metodo_pago?: string | null
          monto?: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_id_miembro_fkey"
            columns: ["id_miembro"]
            isOneToOne: false
            referencedRelation: "miembros"
            referencedColumns: ["id_miembro"]
          },
        ]
      }
      personal: {
        Row: {
          apellido: string
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          email: string | null
          id_personal: number
          nombre: string
          puesto: string | null
          telefono: string | null
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          apellido: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          email?: string | null
          id_personal?: number
          nombre: string
          puesto?: string | null
          telefono?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          apellido?: string
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          email?: string | null
          id_personal?: number
          nombre?: string
          puesto?: string | null
          telefono?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      reservas: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          estado: string | null
          fecha: string
          hora_fin: string
          hora_inicio: string
          id_instalacion: number
          id_miembro: number
          id_reserva: number
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha: string
          hora_fin: string
          hora_inicio: string
          id_instalacion: number
          id_miembro: number
          id_reserva?: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          estado?: string | null
          fecha?: string
          hora_fin?: string
          hora_inicio?: string
          id_instalacion?: number
          id_miembro?: number
          id_reserva?: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_id_instalacion_fkey"
            columns: ["id_instalacion"]
            isOneToOne: false
            referencedRelation: "instalaciones"
            referencedColumns: ["id_instalacion"]
          },
          {
            foreignKeyName: "reservas_id_miembro_fkey"
            columns: ["id_miembro"]
            isOneToOne: false
            referencedRelation: "miembros"
            referencedColumns: ["id_miembro"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          nombre: string
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          nombre: string
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          nombre?: string
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tipos_de_membresia: {
        Row: {
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          descripcion: string | null
          frecuencia_pago: string | null
          id_tipo_membresia: number
          nombre_plan: string
          precio: number
          tenant_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          descripcion?: string | null
          frecuencia_pago?: string | null
          id_tipo_membresia?: number
          nombre_plan: string
          precio: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          descripcion?: string | null
          frecuencia_pago?: string | null
          id_tipo_membresia?: number
          nombre_plan?: string
          precio?: number
          tenant_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellido: string | null
          auth_user_id: string | null
          created_at: string | null
          email: string | null
          id: string
          metadata: Json | null
          nombre: string | null
          updated_at: string | null
        }
        Insert: {
          apellido?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          nombre?: string | null
          updated_at?: string | null
        }
        Update: {
          apellido?: string | null
          auth_user_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          metadata?: Json | null
          nombre?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios_tenants: {
        Row: {
          created_at: string | null
          id: string
          rol: string
          tenant_id: string
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          rol?: string
          tenant_id: string
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          rol?: string
          tenant_id?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_tenants_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_tenants_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_jwt_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

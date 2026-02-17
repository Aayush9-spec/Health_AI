import { createClient } from "@/utils/supabase/client";

// ─── Types ──────────────────────────────────────────────────────────

export interface Profile {
    id: string;
    full_name: string | null;
    email: string | null;
    phone: string | null;
    role: string;
    avatar_url: string | null;
    medical_share: boolean;
    notifications: boolean;
    created_at: string;
    updated_at: string;
}

export interface Doctor {
    id: string;
    user_id: string | null;
    name: string;
    specialty: string;
    location: string | null;
    meet_link: string | null;
    image_color: string;
    available: boolean;
}

export interface Appointment {
    id: string;
    patient_id: string;
    doctor_id: string;
    date: string;
    time: string;
    type: "online" | "offline";
    status: "upcoming" | "completed" | "cancelled" | "rescheduled";
    meet_link: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    // Joined
    doctor?: Doctor;
}

export interface RecordItem {
    id: string;
    record_id: string;
    name: string;
    dosage: string | null;
    price: number;
}

export interface MedicalRecord {
    id: string;
    record_number: string | null;
    patient_id: string;
    doctor_id: string | null;
    type: string;
    diagnosis: string | null;
    status: string;
    date: string;
    created_at: string;
    // Joined
    doctor?: Doctor;
    record_items?: RecordItem[];
}

export interface PrescriptionItem {
    name: string;
    dosage: string;
    duration: string;
}

export interface Prescription {
    id: string;
    prescription_number: string | null;
    doctor_id: string;
    patient_id: string;
    diagnosis: string | null;
    notes: string | null;
    status: string;
    created_at: string;
    prescription_items?: PrescriptionItem[];
}

// ─── Auth Helper ────────────────────────────────────────────────────

export async function getCurrentUserId(): Promise<string | null> {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
}

// ─── Profiles ───────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
    }
    return data;
}

export async function updateProfile(
    userId: string,
    updates: Partial<Pick<Profile, "full_name" | "email" | "phone" | "medical_share" | "notifications">>
): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId);

    if (error) {
        console.error("Error updating profile:", error.message);
        return false;
    }
    return true;
}

// ─── Doctors ────────────────────────────────────────────────────────

export async function getDoctors(): Promise<Doctor[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("available", true)
        .order("name");

    if (error) {
        console.error("Error fetching doctors:", error.message);
        return [];
    }
    return data ?? [];
}

// ─── Appointments ───────────────────────────────────────────────────

export async function getAppointments(
    userId: string,
    status?: "upcoming" | "completed" | "cancelled"
): Promise<Appointment[]> {
    const supabase = createClient();
    let query = supabase
        .from("appointments")
        .select("*, doctor:doctors(*)")
        .eq("patient_id", userId)
        .order("date", { ascending: true });

    if (status) {
        query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching appointments:", error.message);
        return [];
    }
    return data ?? [];
}

export async function bookAppointment(appointment: {
    patient_id: string;
    doctor_id: string;
    date: string;
    time: string;
    type: "online" | "offline";
    meet_link?: string;
}): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase.from("appointments").insert({
        ...appointment,
        status: "upcoming",
    });

    if (error) {
        console.error("Error booking appointment:", error.message);
        return false;
    }
    return true;
}

export async function rescheduleAppointment(
    appointmentId: string,
    newDate: string
): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
        .from("appointments")
        .update({ date: newDate, status: "upcoming" })
        .eq("id", appointmentId);

    if (error) {
        console.error("Error rescheduling appointment:", error.message);
        return false;
    }
    return true;
}

export async function cancelAppointment(appointmentId: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointmentId);

    if (error) {
        console.error("Error cancelling appointment:", error.message);
        return false;
    }
    return true;
}

// ─── Medical Records ────────────────────────────────────────────────

export async function getMedicalRecords(userId: string): Promise<MedicalRecord[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("medical_records")
        .select("*, doctor:doctors(*), record_items(*)")
        .eq("patient_id", userId)
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching medical records:", error.message);
        return [];
    }
    return data ?? [];
}

export async function updateRecordStatus(
    recordId: string,
    status: string
): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
        .from("medical_records")
        .update({ status })
        .eq("id", recordId);

    if (error) {
        console.error("Error updating record status:", error.message);
        return false;
    }
    return true;
}

// ─── Doctor-specific: Patients ──────────────────────────────────────

export interface DoctorPatient {
    id: string;
    name: string;
    age: number | null;
    gender: string | null;
    lastVisit: string | null;
    condition: string | null;
    status: string;
    visits: number;
}

export async function getDoctorPatients(doctorUserId: string): Promise<DoctorPatient[]> {
    const supabase = createClient();

    // First get the doctor's ID from user_id
    const { data: doctorRow } = await supabase
        .from("doctors")
        .select("id")
        .eq("user_id", doctorUserId)
        .single();

    if (!doctorRow) return [];

    // Get unique patients who have appointments with this doctor
    const { data: appointments, error } = await supabase
        .from("appointments")
        .select("patient_id, date, status, profiles:patient_id(full_name, email)")
        .eq("doctor_id", doctorRow.id)
        .order("date", { ascending: false });

    if (error || !appointments) {
        console.error("Error fetching doctor patients:", error?.message);
        return [];
    }

    // Aggregate by patient
    const patientMap = new Map<string, DoctorPatient>();
    for (const apt of appointments) {
        const pid = apt.patient_id;
        const profile = apt.profiles as any;
        if (!patientMap.has(pid)) {
            patientMap.set(pid, {
                id: pid,
                name: profile?.full_name || profile?.email || "Unknown",
                age: null,
                gender: null,
                lastVisit: apt.date,
                condition: null,
                status: apt.status === "upcoming" ? "Active" : "Follow-up",
                visits: 1,
            });
        } else {
            const existing = patientMap.get(pid)!;
            existing.visits += 1;
        }
    }

    return Array.from(patientMap.values());
}

// Get patients for doctor prescription dropdown (simplified)
export async function getDoctorPatientsList(doctorUserId: string): Promise<{ id: string; name: string; lastVisit: string | null }[]> {
    const patients = await getDoctorPatients(doctorUserId);
    return patients.map((p) => ({
        id: p.id,
        name: p.name,
        lastVisit: p.lastVisit,
    }));
}

// ─── Doctor-specific: Prescriptions ─────────────────────────────────

export async function createPrescription(data: {
    doctorUserId: string;
    patientId: string;
    diagnosis: string;
    notes: string;
    medicines: PrescriptionItem[];
}): Promise<boolean> {
    const supabase = createClient();

    // Get doctor ID from user_id
    const { data: doctorRow } = await supabase
        .from("doctors")
        .select("id")
        .eq("user_id", data.doctorUserId)
        .single();

    if (!doctorRow) {
        console.error("Doctor profile not found for user");
        return false;
    }

    // Generate prescription number
    const prescNum = `RX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Insert prescription
    const { data: prescription, error: presError } = await supabase
        .from("prescriptions")
        .insert({
            prescription_number: prescNum,
            doctor_id: doctorRow.id,
            patient_id: data.patientId,
            diagnosis: data.diagnosis,
            notes: data.notes,
            status: "sent",
        })
        .select("id")
        .single();

    if (presError || !prescription) {
        console.error("Error creating prescription:", presError?.message);
        return false;
    }

    // Insert medicine items
    if (data.medicines.length > 0) {
        const items = data.medicines
            .filter((m) => m.name.trim() !== "")
            .map((m) => ({
                prescription_id: prescription.id,
                name: m.name,
                dosage: m.dosage,
                duration: m.duration,
            }));

        if (items.length > 0) {
            const { error: itemsError } = await supabase
                .from("prescription_items")
                .insert(items);

            if (itemsError) {
                console.error("Error inserting prescription items:", itemsError.message);
            }
        }
    }

    // Also create a medical record for the patient
    const recNum = `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const { data: record, error: recError } = await supabase
        .from("medical_records")
        .insert({
            record_number: recNum,
            patient_id: data.patientId,
            doctor_id: doctorRow.id,
            type: "Prescription",
            diagnosis: data.diagnosis,
            status: "Pending Order",
        })
        .select("id")
        .single();

    if (!recError && record && data.medicines.length > 0) {
        const recItems = data.medicines
            .filter((m) => m.name.trim() !== "")
            .map((m) => ({
                record_id: record.id,
                name: m.name,
                dosage: `${m.dosage} (${m.duration})`,
                price: 0.002,
            }));

        if (recItems.length > 0) {
            await supabase.from("record_items").insert(recItems);
        }
    }

    return true;
}

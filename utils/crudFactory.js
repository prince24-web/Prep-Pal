import supabase from "../config/supabaseClient.js";

const createCrudHandlers = (table) => ({
    async getAll() {
        const { data, error } = await supabase.from(table).select("*");
        if (error) throw error;
        return data;
    },

    async getOne(id) {
        const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(payload) {
        const { data, error } = await supabase
            .from(table)
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    },

    async update(id, payload) {
        const { data, error } = await supabase
            .from(table)
            .update(payload)
            .eq("id", id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async remove(id) {
        const { error } = await supabase.from(table).delete().eq("id", id);
        if (error) throw error;
        return { success: true };
    },
});

export default createCrudHandlers;

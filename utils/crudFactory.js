import supabase from "../config/supabaseClient.js";

const createCrudHandlers = (table, user = {}) => ({
    async getAll(options) {
        let query = supabase.from(table).select("*");
        if (user && user.id) query = query.eq("user_id", user.id);

        const { page, pageSize, limit, offset, orderBy } = options;

        if (page && pageSize) {
            const calculatedOffset = (page - 1) * pageSize;
            query = query.range(
                calculatedOffset,
                calculatedOffset + pageSize - 1
            );
        } else if (limit) {
            query = query.limit(limit);
            if (offset) {
                query = query.range(offset, offset + limit - 1);
            }
        } else if (offset) {
            query = query.range(offset, Infinity);
        }

        if (orderBy) {
            if (Array.isArray(orderBy)) {
                orderBy.forEach((order) => {
                    query = query.order(order.column, {
                        ascending: order.ascending || true,
                    });
                });
            } else {
                query = query.order(orderBy.column, {
                    ascending: orderBy.ascending || true,
                });
            }
        }

        const { data, error } = await query;
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

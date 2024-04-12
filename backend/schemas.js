const { z } = require('zod');

const login = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
});

const register = z
    .object({
        name: z.string(),
        surname: z.string(),
    })
    .merge(login);

const apiList = z.object({
    apiList: z.string().array(),
});

const filterSettings = z
    .object({
        fromDate: z.string().nullable().or(z.string().datetime()),
        toDate: z.string().datetime(),
        extraFilters: z.record(z.any()),
        sortOrder: z.string(),
    })
    .merge(apiList);

const search = z
    .object({
        term: z.string(),
        page: z.number(),
    })
    .merge(filterSettings);

const favorite = z.object({
    type: z.enum(['add', 'remove']),
    news: z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        url: z.string().url(),
        imageUrl: z.string().optional(),
        authors: z.string().optional(),
        publishDate: z.string().optional(),
    }),
});

module.exports = {
    register,
    login,
    filterSettings,
    apiList,
    search,
    favorite,
};

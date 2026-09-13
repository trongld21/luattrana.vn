import { prisma } from './prisma';
export const models = Object.assign(Object.create(null), { posts: prisma.post, categories: prisma.category, documents: prisma.legalDocument, consultations: prisma.consultation, media: prisma.media });
export const mediaSelect = { id: true, name: true, mimeType: true, createdAt: true };

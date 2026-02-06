"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const passwordHash = await bcrypt.hash('password123', 10);
    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            name: 'Demo User',
            passwordHash: passwordHash,
        },
    });
    console.log({ demoUser });
    const eventsData = [
        {
            title: 'Innovation Summit 2026',
            description: 'A gathering of industry leaders to discuss the latest in tech.',
            dateTime: new Date('2026-03-15T10:00:00Z'),
            location: 'Silicon Valley, CA',
        },
        {
            title: 'Local Art Exhibition',
            description: 'Showcasing the talent of our community artists.',
            dateTime: new Date('2026-03-20T18:00:00Z'),
            location: 'Community Center, New York',
        },
        {
            title: 'Fitness Masterclass',
            description: 'Join us for a 2-hour high-intensity workout session.',
            dateTime: new Date('2026-04-01T08:00:00Z'),
            location: 'Central Park, NY',
        },
        {
            title: 'Cooking Workshop: Pasta Making',
            description: 'Learn the secrets of authentic Italian pasta from a pro chef.',
            dateTime: new Date('2026-04-05T15:00:00Z'),
            location: 'Culinary Institute, Rome',
        },
        {
            title: 'Startup Pitch Night',
            description: 'Best startups pitch to investors in a Shark Tank style event.',
            dateTime: new Date('2026-04-10T19:00:00Z'),
            location: 'The Garage, Austin',
        },
        {
            title: 'Tech Conference 2026',
            description: 'Exploring AI, Blockchain, and the future of web.',
            dateTime: new Date('2026-05-12T09:00:00Z'),
            location: 'Moscone Center, SF',
        },
        {
            title: 'Music Festival',
            description: 'Three days of amazing music and fun under the sun.',
            dateTime: new Date('2026-06-21T12:00:00Z'),
            location: 'Coachella Valley, CA',
        },
        {
            title: 'Wine Tasting Evening',
            description: 'Taste the finest selections from our local vineyards.',
            dateTime: new Date('2026-07-04T18:00:00Z'),
            location: 'Napa Valley, CA',
        },
        {
            title: 'Networking Brunch',
            description: 'Connect with professionals over delicious food.',
            dateTime: new Date('2026-02-15T11:00:00Z'),
            location: 'The Ritz, London',
        },
        {
            title: 'Web Dev Meetup',
            description: 'Discussing Next.js 15 and the latest frontend trends.',
            dateTime: new Date('2026-02-28T18:30:00Z'),
            location: 'Tech Hub, Berlin',
        },
        {
            title: 'Photography Walk',
            description: 'A guided tour through the city for photography enthusiasts.',
            dateTime: new Date('2026-03-05T10:00:00Z'),
            location: 'Golden Gate Park, SF',
        },
        {
            title: 'Yoga Retreat',
            description: 'Unplug and recharge in the beautiful mountains.',
            dateTime: new Date('2026-05-20T07:00:00Z'),
            location: 'Swiss Alps, Switzerland',
        },
    ];
    for (const event of eventsData) {
        await prisma.event.create({
            data: {
                ...event,
                userId: demoUser.id,
            },
        });
    }
    console.log('Seed data created successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
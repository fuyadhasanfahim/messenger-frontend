'use client';

import { useParams } from 'next/navigation';

export default function MessagePage() {
    const { username } = useParams();
    return <div>{username}</div>;
}

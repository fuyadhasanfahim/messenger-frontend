import { Info, Phone, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { NavUser } from './nav-user';

export default function Header() {
    return (
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <nav className="flex items-center justify-between w-full">
                <NavUser
                    user={{
                        name: 'John Doe',
                        email: 'john.doe@gmail.com',
                        avatar: '',
                    }}
                />
                <div className="grid grid-cols-3 items-center gap-2">
                    <Button className="rounded-full size-8">
                        <Phone />
                    </Button>
                    <Button className="rounded-full size-8">
                        <Video />
                    </Button>
                    <Button className="rounded-full size-8">
                        <Info />
                    </Button>
                </div>
            </nav>
        </header>
    );
}

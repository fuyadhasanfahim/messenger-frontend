'use client';

import React, {
    useState,
    useRef,
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
} from 'react';
import {
    Paperclip,
    Send,
    X,
    FileText,
    Film,
    Mic,
    ImageIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';

// Define types for improved type safety
interface FileWithPreview extends File {
    preview?: string;
}

export default function NavFooter() {
    const [message, setMessage] = useState<string>('');
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [showAttachmentOptions, setShowAttachmentOptions] =
        useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea based on content
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Reset height to calculate proper scrollHeight
            textarea.style.height = 'auto';

            // Set a max height for scrolling when content gets too long
            const maxHeight = 150;
            const scrollHeight = textarea.scrollHeight;

            // Apply the new height while maintaining the rounded appearance
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

            // Add or remove rounded-bottom classes based on content height
            if (scrollHeight > maxHeight) {
                textarea.classList.remove('rounded-full');
                textarea.classList.add('rounded-2xl');
            } else if (message.split('\n').length > 1) {
                textarea.classList.remove('rounded-full');
                textarea.classList.add('rounded-2xl');
            } else {
                textarea.classList.remove('rounded-2xl');
                textarea.classList.add('rounded-full');
            }
        }
    };

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        // Adjust height whenever content changes
        setTimeout(adjustTextareaHeight, 0);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file: File) => {
                // Create a FileWithPreview type
                const fileWithPreview = file as FileWithPreview;
                return fileWithPreview;
            });
            setFiles([...files, ...newFiles]);
        }
        setShowAttachmentOptions(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() || files.length > 0) {
            // Handle form submission
            console.log('Submitting message:', message);
            console.log('With files:', files);
            setMessage('');
            setFiles([]);

            // Reset textarea height after submission
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.classList.remove('rounded-2xl');
                textareaRef.current.classList.add('rounded-full');
            }
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const getFileIcon = (file: File) => {
        const type = file.type.split('/')[0];
        switch (type) {
            case 'image':
                return <ImageIcon className="w-4 h-4" />;
            case 'video':
                return <Film className="w-4 h-4" />;
            case 'audio':
                return <Mic className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.form;
            if (form) {
                const fakeEvent = {
                    preventDefault: () => {},
                } as FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent);
            }
        }
    };

    return (
        <footer className="sticky bottom-0 flex shrink-0 items-center gap-2 border-t bg-background p-4">
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2 max-h-32 overflow-y-auto p-2 bg-slate-100 rounded-lg">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-white rounded-full px-3 py-1 text-sm shadow-sm"
                            >
                                {getFileIcon(file)}
                                <span className="mx-2 truncate max-w-32">
                                    {file.name}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-5 w-5 p-0 rounded-full hover:bg-slate-200"
                                    onClick={() => removeFile(index)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between gap-2 w-full relative">
                    <div className="relative">
                        <Button
                            type="button"
                            className="rounded-full size-10 flex items-center justify-center"
                            onClick={() =>
                                setShowAttachmentOptions(!showAttachmentOptions)
                            }
                        >
                            <Paperclip className="w-5 h-5" />
                        </Button>

                        {showAttachmentOptions && (
                            <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg p-2 z-10 border">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex items-center justify-start gap-2 hover:bg-slate-100"
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.accept =
                                                    'image/*';
                                                fileInputRef.current.click();
                                            }
                                        }}
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Photo</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex items-center justify-start gap-2 hover:bg-slate-100"
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.accept =
                                                    'video/*';
                                                fileInputRef.current.click();
                                            }
                                        }}
                                    >
                                        <Film className="w-4 h-4" />
                                        <span>Video</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex items-center justify-start gap-2 hover:bg-slate-100"
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.accept =
                                                    '*/*';
                                                fileInputRef.current.click();
                                            }
                                        }}
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span>Document</span>
                                    </Button>
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />
                    </div>

                    <Textarea
                        ref={textareaRef}
                        className="min-h-10 rounded-full px-4 py-2 resize-none flex-grow transition-all duration-200"
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />

                    <Button
                        type="submit"
                        className="rounded-full size-10 flex items-center justify-center"
                        disabled={!message.trim() && files.length === 0}
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        </footer>
    );
}

import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableGalleryItemProps = {
    item: any;
};

export function SortableGalleryItem({
    item,
}: SortableGalleryItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 rounded-2xl border border-hairline p-3"
        >
            {/* HANDLE */}
            <button
                type="button"
                {...attributes}
                {...listeners}
                className="shrink-0 cursor-grab touch-none text-muted-foreground transition-colors hover:text-foreground active:cursor-grabbing"
                aria-label={`Reordenar ${item.title}`}
            >
                <GripVertical className="h-5 w-5" />
            </button>

            {/* IMAGEM */}
            <img
                src={item.image_url}
                alt={item.title}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />

            {/* INFORMAÇÕES */}
            <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                    {item.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    {item.gallery_categories?.name ??
                        "Sem categoria"}
                </p>
            </div>

            {/* STATUS */}
            <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                    item.active
                        ? "bg-white/10 text-foreground"
                        : "bg-white/5 text-muted-foreground"
                }`}
            >
                {item.active ? "Ativo" : "Inativo"}
            </span>
        </div>
    );
}
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableGalleryItemProps = {
    item: any;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
};

export function SortableGalleryItem({
    item,
    onEdit,
    onDelete,
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

            <div className="flex shrink-0 items-center gap-2">
                {onEdit && (
                    <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="cursor-pointer rounded-lg border border-hairline bg-transparent px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-white/5"
                    >
                        Editar
                    </button>
                )}

                {onDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="cursor-pointer rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition-colors hover:bg-red-500/20"
                    >
                        Excluir
                    </button>
                )}
            </div>
        </div>
    );
}
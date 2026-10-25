/* oxlint-disable typescript/no-explicit-any */
/* oxlint-disable react/display-name */
/* oxlint-disable no-unused-vars */

// SmetaTable.tsx
// SmetaTable.tsx
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Box, Text, TextInput, NumberInput, ActionIcon, Menu, Loader } from '@mantine/core';
import { IconGripVertical, IconTrash, IconCopy, IconPlus, IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_Row } from 'lotus-ui-react/external';
import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';

// Типы данных
export type SmetaRow = {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
  level: number;
  isGroup?: boolean;
  parentId?: string | null;
  order?: number;
  children?: SmetaRow[];
};

interface SmetaTableProps {
  initialData?: SmetaRow[];
  onChange?: (data: SmetaRow[]) => void;
}

// Оптимизированный компонент строки
const RowCell: React.FC<{
  value: any;
  isEditing: boolean;
  onChange: (value: any) => void;
  onEditStart: () => void;
  onEditEnd: () => void;
  type?: 'text' | 'number';
  decimalScale?: number;
  align?: 'left' | 'right';
  fontWeight?: number;
}> = React.memo(({ value, isEditing, onChange, onEditStart, onEditEnd, type = 'text', decimalScale = 0, align = 'left', fontWeight = 400 }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    if (type === 'number') {
      return (
        <NumberInput
          ref={inputRef}
          decimalScale={decimalScale}
          size="xs"
          styles={{ input: { textAlign: align, minHeight: 28 } }}
          value={value || 0}
          onBlur={onEditEnd}
          onChange={(val) => onChange(Number(val) || 0)}
          onKeyDown={(e) => e.key === 'Enter' && onEditEnd()}
        />
      );
    }
    return (
      <TextInput
        ref={inputRef}
        size="xs"
        styles={{ input: { minHeight: 28 } }}
        value={value || ''}
        onBlur={onEditEnd}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEditEnd()}
      />
    );
  }

  return (
    <Text fw={fontWeight} lineClamp={1} size="sm" style={{ cursor: 'text', minHeight: 28, lineHeight: '28px' }} ta={align} onDoubleClick={onEditStart}>
      {type === 'number' && value !== 0 ? (decimalScale === 3 ? value.toFixed(3) : value.toLocaleString()) : value}
      {type === 'number' && value === 0 ? '' : type !== 'number' && value}
    </Text>
  );
});

const SmetaTable: React.FC<SmetaTableProps> = ({ initialData = [], onChange }) => {
  // Состояния
  const [data, setData] = useState<SmetaRow[]>(() => {
    if (initialData.length > 0) return initialData;
    return [
      { id: '1', code: '', name: '1. ЗЕМЛЯНЫЕ РАБОТЫ', unit: '', quantity: 0, price: 0, total: 0, level: 0, isGroup: true, parentId: null, order: 1 },
      {
        id: '1.1',
        code: 'ТЕР01-01-001',
        name: 'Разработка грунта экскаватором',
        unit: '1000м3',
        quantity: 2.5,
        price: 3850,
        total: 9625,
        level: 1,
        parentId: '1',
        order: 1
      },
      {
        id: '1.2',
        code: 'ТЕР01-02-005',
        name: 'Перемещение грунта автосамосвалами',
        unit: '1000м3',
        quantity: 2.5,
        price: 4200,
        total: 10500,
        level: 1,
        parentId: '1',
        order: 2
      },
      { id: '2', code: '', name: '2. ФУНДАМЕНТЫ', unit: '', quantity: 0, price: 0, total: 0, level: 0, isGroup: true, parentId: null, order: 2 },
      {
        id: '2.1',
        code: 'ТЕР06-01-001',
        name: 'Устройство бетонной подготовки',
        unit: '100м3',
        quantity: 1.2,
        price: 12500,
        total: 15000,
        level: 1,
        parentId: '2',
        order: 1
      }
    ];
  });

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['1', '2']));
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: keyof SmetaRow } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Сенсоры для drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor));

  // Построение дерева и получение видимых строк (оптимизировано)
  const { visibleData, rowMap } = useMemo(() => {
    // Строим карту для быстрого доступа
    const map = new Map<string, SmetaRow>();
    data.forEach((row) => map.set(row.id, row));

    // Строим дерево
    const buildTree = (rows: SmetaRow[]): SmetaRow[] => {
      const rootRows: SmetaRow[] = [];
      const childrenMap = new Map<string, SmetaRow[]>();

      rows.forEach((row) => {
        if (row.parentId) {
          const children = childrenMap.get(row.parentId) || [];
          children.push(row);
          childrenMap.set(row.parentId, children);
        } else {
          rootRows.push(row);
        }
      });

      // Сортируем
      const sortRows = (rowsList: SmetaRow[]) => {
        rowsList.sort((a, b) => (a.order || 0) - (b.order || 0));
        rowsList.forEach((row) => {
          const children = childrenMap.get(row.id);
          if (children) {
            sortRows(children);
            row.children = children;
          }
        });
      };

      sortRows(rootRows);
      return rootRows;
    };

    const tree = buildTree(data);

    // Получаем видимые строки (без рекурсии с проверкой на лету)
    const getVisibleRows = (rows: SmetaRow[], result: SmetaRow[] = []) => {
      for (const row of rows) {
        result.push(row);
        if (row.isGroup && expandedRows.has(row.id) && row.children) {
          getVisibleRows(row.children, result);
        }
      }
      return result;
    };

    const visible = getVisibleRows(tree);
    return { visibleData: visible, rowMap: map };
  }, [data, expandedRows]);

  // Пересчет итогов (оптимизирован)
  const recalculateTotals = useCallback((rows: SmetaRow[]): SmetaRow[] => {
    const newRows = [...rows];
    const totalsMap = new Map<string, number>();

    // Сначала считаем снизу вверх
    for (let i = newRows.length - 1; i >= 0; i--) {
      const row = newRows[i];
      if (row.isGroup) {
        const children = newRows.filter((r) => r.parentId === row.id);
        const sum = children.reduce((acc, child) => acc + child.total, 0);
        if (row.total !== sum) {
          row.total = sum;
        }
        totalsMap.set(row.id, sum);
      } else if (!row.isGroup) {
        row.total = row.quantity * row.price;
      }
    }

    return newRows;
  }, []);

  // Обновление строки с дебаунсом
  const updateRow = (id: string, updates: Partial<SmetaRow>) => {
    if (isUpdating) return;
    setIsUpdating(true);

    setData((prevData) => {
      let newData = prevData.map((row) => {
        if (row.id === id) {
          const updated = { ...row, ...updates };
          if (('quantity' in updates || 'price' in updates) && !updated.isGroup) {
            updated.total = updated.quantity * updated.price;
          }
          return updated;
        }
        return row;
      });

      newData = recalculateTotals(newData);
      onChange?.(newData);
      return newData;
    });

    setTimeout(() => setIsUpdating(false), 100);
  };

  // Toggle группы
  const toggleGroup = useCallback((groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  }, []);

  // Добавление строки
  const addRow = useCallback(
    (parentId: string | null = null, level: number = 0) => {
      const newId = `row_${Date.now()}_${Math.random()}`;
      const parent = parentId ? data.find((r) => r.id === parentId) : null;
      const siblings = data.filter((r) => r.parentId === parentId);
      const maxOrder = Math.max(...siblings.map((r) => r.order || 0), 0);

      const newRow: SmetaRow = {
        id: newId,
        code: '',
        name: 'Новая позиция',
        unit: '',
        quantity: 0,
        price: 0,
        total: 0,
        level: parent ? parent.level + 1 : level,
        isGroup: false,
        parentId: parentId,
        order: maxOrder + 1
      };

      setData((prevData) => {
        const newData = [...prevData, newRow];
        onChange?.(newData);
        return newData;
      });

      if (parentId) {
        setExpandedRows((prev) => new Set(prev).add(parentId));
      }

      setEditingCell({ rowId: newId, field: 'name' });
    },
    [data, onChange]
  );

  // Удаление строки
  const deleteRow = useCallback(
    (id: string) => {
      setData((prevData) => {
        const idsToDelete = new Set<string>();

        const collectIds = (rowId: string) => {
          idsToDelete.add(rowId);
          const children = prevData.filter((r) => r.parentId === rowId);
          children.forEach((child) => collectIds(child.id));
        };

        collectIds(id);
        const newData = prevData.filter((row) => !idsToDelete.has(row.id));
        onChange?.(newData);
        return newData;
      });
    },
    [onChange]
  );

  // Копирование строки
  const copyRow = useCallback(
    (row: SmetaRow) => {
      const newId = `row_${Date.now()}_${Math.random()}`;
      const newRow: SmetaRow = {
        ...row,
        id: newId,
        name: `${row.name} (копия)`,
        order: (row.order || 0) + 1
      };

      setData((prevData) => {
        const newData = [...prevData, newRow];
        onChange?.(newData);
        return newData;
      });
    },
    [onChange]
  );

  // Drag-and-drop
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return prevData;

        const newData = arrayMove(prevData, oldIndex, newIndex);
        newData.forEach((item, idx) => {
          item.order = idx;
        });

        onChange?.(newData);
        return newData;
      });
    },
    [onChange]
  );

  // Определение колонок
  const columns = useMemo<MRT_ColumnDef<SmetaRow>[]>(
    () => [
      {
        id: 'drag-handle',
        header: '',
        size: 40,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box style={{ cursor: 'grab', display: 'flex', justifyContent: 'center' }}>
            <IconGripVertical size={16} />
          </Box>
        )
      },
      {
        accessorKey: 'code',
        header: 'Код',
        size: 150,
        Cell: ({ row }) => {
          const isEditing = editingCell?.rowId === row.original.id && editingCell?.field === 'code';
          return (
            <Box ml={row.original.level * 24}>
              <RowCell
                isEditing={isEditing}
                type="text"
                value={row.original.code}
                onChange={(val) => updateRow(row.original.id, { code: val })}
                onEditEnd={() => setEditingCell(null)}
                onEditStart={() => setEditingCell({ rowId: row.original.id, field: 'code' })}
              />
            </Box>
          );
        }
      },
      {
        accessorKey: 'name',
        header: 'Наименование работ и затрат',
        size: 400,
        Cell: ({ row }) => {
          const original = row.original;
          const isExpanded = expandedRows.has(original.id);
          const isEditing = editingCell?.rowId === original.id && editingCell?.field === 'name';

          return (
            <Box ml={original.level * 24} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {original.isGroup && (
                <ActionIcon size="xs" style={{ width: 20, height: 20 }} variant="subtle" onClick={(e) => toggleGroup(original.id, e)}>
                  {isExpanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                </ActionIcon>
              )}
              <Box style={{ flex: 1 }}>
                <RowCell
                  fontWeight={original.level === 0 ? 700 : original.level === 1 ? 600 : 400}
                  isEditing={isEditing}
                  type="text"
                  value={original.name}
                  onChange={(val) => updateRow(original.id, { name: val })}
                  onEditEnd={() => setEditingCell(null)}
                  onEditStart={() => setEditingCell({ rowId: original.id, field: 'name' })}
                />
              </Box>
            </Box>
          );
        }
      },
      {
        accessorKey: 'unit',
        header: 'Ед. изм.',
        size: 100,
        Cell: ({ row }) => {
          if (row.original.isGroup) return <Text size="sm" />;
          const isEditing = editingCell?.rowId === row.original.id && editingCell?.field === 'unit';
          return (
            <RowCell
              isEditing={isEditing}
              type="text"
              value={row.original.unit}
              onChange={(val) => updateRow(row.original.id, { unit: val })}
              onEditEnd={() => setEditingCell(null)}
              onEditStart={() => setEditingCell({ rowId: row.original.id, field: 'unit' })}
            />
          );
        }
      },
      {
        accessorKey: 'quantity',
        header: 'Кол-во',
        size: 120,
        Cell: ({ row }) => {
          if (row.original.isGroup) return <Text size="sm" />;
          const isEditing = editingCell?.rowId === row.original.id && editingCell?.field === 'quantity';
          return (
            <RowCell
              align="right"
              decimalScale={3}
              isEditing={isEditing}
              type="number"
              value={row.original.quantity}
              onChange={(val) => updateRow(row.original.id, { quantity: val })}
              onEditEnd={() => setEditingCell(null)}
              onEditStart={() => setEditingCell({ rowId: row.original.id, field: 'quantity' })}
            />
          );
        }
      },
      {
        accessorKey: 'price',
        header: 'Цена',
        size: 120,
        Cell: ({ row }) => {
          if (row.original.isGroup) return <Text size="sm" />;
          const isEditing = editingCell?.rowId === row.original.id && editingCell?.field === 'price';
          return (
            <RowCell
              align="right"
              decimalScale={2}
              isEditing={isEditing}
              type="number"
              value={row.original.price}
              onChange={(val) => updateRow(row.original.id, { price: val })}
              onEditEnd={() => setEditingCell(null)}
              onEditStart={() => setEditingCell({ rowId: row.original.id, field: 'price' })}
            />
          );
        }
      },
      {
        accessorKey: 'total',
        header: 'Итого',
        size: 150,
        Cell: ({ row }) => {
          const original = row.original;
          let value = original.total;

          if (original.isGroup && original.total === 0 && original.children) {
            value = original.children.reduce((acc, child) => acc + child.total, 0);
          }

          return (
            <Text fw={original.isGroup ? 700 : 400} size="sm" ta="right">
              {value !== 0 ? value.toLocaleString('ru-RU') : ''}
            </Text>
          );
        }
      },
      {
        id: 'actions',
        header: '',
        size: 80,
        enableSorting: false,
        Cell: ({ row }) => (
          <Menu withinPortal position="bottom-end">
            <Menu.Target>
              <ActionIcon size="sm" variant="subtle" onClick={(e) => e.stopPropagation()}>
                ⋮
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPlus size={14} />} onClick={() => addRow(row.original.id, row.original.level + 1)}>
                Добавить позицию
              </Menu.Item>
              <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => copyRow(row.original)}>
                Копировать
              </Menu.Item>
              <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={() => deleteRow(row.original.id)}>
                Удалить
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )
      }
    ],
    [expandedRows, editingCell, updateRow, toggleGroup, addRow, copyRow, deleteRow]
  );

  const table = useMantineReactTable({
    columns,
    data: visibleData,
    enableSorting: false,
    enableStickyHeader: true,
    enableRowVirtualization: visibleData.length > 100,
    enablePagination: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
      withColumnBorders: true
    },
    mantineTableHeadCellProps: {
      style: {
        backgroundColor: '#f5f5f5',
        fontWeight: 700,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }
    },
    mantinePaperProps: {
      style: {
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }
    },
    state: {
      isLoading: isUpdating
    }
  });

  return (
    <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={data.map((row) => row.id)} strategy={verticalListSortingStrategy}>
        <div style={{ position: 'relative', height: '100%' }}>
          <MantineReactTable table={table} />

          <Box
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 100
            }}
          >
            <Menu position="top-end">
              <Menu.Target>
                <ActionIcon color="blue" radius="xl" size="lg" variant="filled">
                  <IconPlus size={20} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => addRow(null, 0)}>Добавить раздел</Menu.Item>
                <Menu.Item onClick={() => addRow(null, 1)}>Добавить позицию</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SmetaTable;

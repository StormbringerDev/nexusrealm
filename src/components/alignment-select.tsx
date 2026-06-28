'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { alignments } from '@/lib/types/character';
import type { Alignment } from '@/lib/types/character';

interface AlignmentSelectProps {
  value: Alignment;
  onAlignmentChange: (alignment: Alignment) => void;
}

export function AlignmentSelect({ value, onAlignmentChange }: AlignmentSelectProps) {
  return (
    <Select value={value} onValueChange={onAlignmentChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an alignment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {alignments.map(alignment => (
            <SelectItem key={alignment} value={alignment}>
              {alignment}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

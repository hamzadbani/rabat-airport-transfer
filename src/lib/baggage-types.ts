export const BAGGAGE_TYPE_IDS = ['cabin', 'checked', 'large', 'other'] as const;

export type BaggageTypeId = (typeof BAGGAGE_TYPE_IDS)[number];

export type BaggageCounts = Record<BaggageTypeId, number>;

export function defaultBaggageCounts(): BaggageCounts {
    return { cabin: 0, checked: 0, large: 0, other: 0 };
}

export type BaggageLine = {
    id: string;
    typeId: BaggageTypeId;
    count: number;
    /** Free text when typeId is "other". */
    otherDetail?: string;
};

let baggageLineSeq = 0;

export function newBaggageLineId(): string {
    baggageLineSeq += 1;
    return `bag-${baggageLineSeq}`;
}

export function defaultBaggageLines(): BaggageLine[] {
    return [{ id: newBaggageLineId(), typeId: 'checked', count: 0 }];
}

export function baggageLinesToCounts(lines: BaggageLine[]): BaggageCounts {
    const counts = defaultBaggageCounts();
    for (const line of lines) {
        if (line.count > 0) {
            counts[line.typeId] += line.count;
        }
    }
    return counts;
}

export function formatBaggageLinesSummary(
    lines: BaggageLine[],
    typeLabel: (typeId: BaggageTypeId) => string,
    noneLabel = '—',
): string {
    const parts: string[] = [];
    for (const line of lines) {
        if (line.count <= 0) continue;
        let label = typeLabel(line.typeId);
        if (line.typeId === 'other') {
            const detail = line.otherDetail?.trim();
            if (detail) label = `${label}: ${detail}`;
        }
        parts.push(`${label} ×${line.count}`);
    }
    return parts.length > 0 ? parts.join(', ') : noneLabel;
}

/** @deprecated Prefer formatBaggageLinesSummary when lines include otherDetail. */
export function formatBaggageSummary(
    counts: BaggageCounts,
    labelFor: (typeId: BaggageTypeId) => string,
    noneLabel = '—',
): string {
    const parts = BAGGAGE_TYPE_IDS.filter((id) => counts[id] > 0).map(
        (id) => `${labelFor(id)} ×${counts[id]}`,
    );
    return parts.length > 0 ? parts.join(', ') : noneLabel;
}

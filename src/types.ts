export enum Mode {
    Regular = "REGULAR",
    Audio = "AUDIO",
    Mixed = "MIXED",
};

export interface Book {
    __typename?: string;
    id?: string;
    author?: string;
    title?: string;
    mode?: Mode;
    completed?: string;
}

export interface Movie {
    __typename?: string;
    id?: string;
    title?: string;
    year?: string;
    notes?: string;
    imdbId?: string;
    completed?: string;
}

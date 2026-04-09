'use client'

export function AssetUploadPanel() {
  return (
    <section
      aria-labelledby="asset-upload-heading"
      className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 p-6 shadow-[var(--shadow-panel)] sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Upload assetów</p>
          <h2
            id="asset-upload-heading"
            className="font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Wrzuć nowe pliki do HQ
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Pierwszy etap uploadu jest już gotowy w interfejsie. Dropzone przyjmuje obrazy, wideo i PDF-y, a kolejny krok dopnie zapis do storage i indeksacji.
          </p>
          <div className="flex flex-wrap gap-2">
            {['PNG / JPG / WEBP', 'MP4 / MOV', 'PDF do 10 MB'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="asset-upload-input"
            className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-border/80 bg-background/80 px-6 py-8 text-center shadow-[var(--shadow-panel)] transition hover:border-foreground/20"
          >
            <span className="font-display text-2xl tracking-[-0.03em] text-foreground">
              Przeciągnij pliki tutaj
            </span>
            <span className="mt-2 text-sm leading-7 text-muted-foreground">
              Albo kliknij i wybierz asset do dalszej ingestii.
            </span>
            <span className="mt-4 rounded-full border border-border/70 bg-card px-4 py-2 text-xs tracking-[0.08em] text-foreground">
              Wybierz plik
            </span>
          </label>

          <input
            id="asset-upload-input"
            name="asset-upload"
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            className="sr-only"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Walidacja</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                Typ pliku, rozmiar i podstawowe metadane będą sprawdzane przed ingestem.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Status</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                Backend uploadu jeszcze nie jest dopięty. Ten panel przygotowuje realny punkt wejścia w UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

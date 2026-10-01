import io

p = "src/components/public-site/public-pages.tsx"
s = io.open(p, encoding="utf-8", newline="").read()


def rep(old, new):
    global s
    assert s.count(old) == 1, old[:110]
    s = s.replace(old, new)


# ---------------------------------------------------------------- ordering
# Below xl the copy container becomes `display: contents`, so its two children
# are flex items of the section itself and can be ordered around the image.
# That is what puts the capability bar after the visual on mobile. From xl the
# container is a flex box again and every one of its own classes applies, so
# the desktop layout is untouched.
rep(
    '<div className="pointer-events-none relative z-30 mx-auto flex w-full max-w-[120rem] flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 xl:px-[4%] xl:py-14 xl:min-h-[calc(100svh-4.5rem-1px)]">',
    '<div className="contents xl:pointer-events-none xl:relative xl:z-30 xl:mx-auto xl:flex xl:w-full xl:max-w-[120rem] xl:flex-col xl:justify-center xl:px-[4%] xl:py-14 xl:min-h-[calc(100svh-4.5rem-1px)]">',
)

# The padding the container used to supply now rides on the children, and is
# cancelled at xl where the container supplies it again.
rep(
    '<div className="pointer-events-auto flex w-full min-w-0 max-w-xl flex-col gap-6 xl:max-w-[34rem] xl:flex-1 xl:justify-center 2xl:max-w-[38.75rem]">',
    '<div className="pointer-events-auto order-1 flex w-full min-w-0 max-w-xl flex-col gap-6 px-5 pt-10 sm:px-8 sm:pt-12 xl:order-none xl:max-w-[34rem] xl:flex-1 xl:justify-center xl:px-0 xl:pt-0 2xl:max-w-[38.75rem]">',
)

rep(
    '<div className="pointer-events-auto mt-10 overflow-hidden rounded-2xl border border-white/15 bg-[#06223f]/80 shadow-[0_18px_44px_rgba(2,12,26,0.4)] backdrop-blur-sm lg:mt-12">',
    '<div className="pointer-events-auto order-3 mx-5 mt-8 overflow-hidden rounded-2xl border border-white/15 bg-[#06223f]/80 pb-0 shadow-[0_18px_44px_rgba(2,12,26,0.4)] backdrop-blur-sm sm:mx-8 lg:mt-12 xl:order-none xl:mx-0 xl:mb-0">',
)

rep(
    '<div className="relative order-last mt-2 aspect-[4/3] w-full sm:mt-0 sm:aspect-[1672/941] xl:absolute xl:right-[1.5%] xl:top-1/2 xl:order-none xl:aspect-[1672/941] xl:w-[72%] xl:-translate-y-[60%]">',
    '<div className="relative order-2 mt-6 aspect-[4/3] w-full sm:mt-8 sm:aspect-[1672/941] xl:absolute xl:right-[1.5%] xl:top-1/2 xl:order-none xl:mt-0 xl:aspect-[1672/941] xl:w-[72%] xl:-translate-y-[60%]">',
)

# The section needs bottom breathing room now that the bar is its last child.
rep(
    '<section className="relative flex flex-col overflow-hidden bg-[#031b35] text-white xl:block xl:min-h-[36rem] 2xl:min-h-[46rem]">',
    '<section className="relative flex flex-col overflow-hidden bg-[#031b35] pb-10 text-white sm:pb-12 xl:block xl:pb-0 xl:min-h-[36rem] 2xl:min-h-[46rem]">',
)

# ---------------------------------------------------------------- benefits
# Three columns from the smallest width, with the icon stacked above the text
# so each column stays readable at a third of a phone screen.
rep(
    '<ul className="grid min-w-0 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-5">',
    '<ul className="grid min-w-0 grid-cols-3 gap-3 sm:gap-5 lg:gap-5">',
)
rep(
    '<li key={title} className="flex min-w-0 items-start gap-3">',
    '<li\n                  key={title}\n                  className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:gap-3"\n                >',
)
rep(
    '<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-sky-200">',
    '<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sky-200 sm:size-11">',
)

io.open(p, "w", encoding="utf-8", newline="").write(s)
print("mobile ordering + benefits applied")

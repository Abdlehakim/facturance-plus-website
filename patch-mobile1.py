import io

p = "src/components/public-site/public-pages.tsx"
s = io.open(p, encoding="utf-8", newline="").read()


def rep(old, new):
    global s
    assert s.count(old) == 1, old[:110]
    s = s.replace(old, new)


# ----------------------------------------------------------------- heading
# Bigger and less tightly tracked on phones; lg and above keep their exact
# previous size, leading and tracking.
rep(
    '<h1 className="mt-4 text-[1.75rem] font-bold leading-[1.08] tracking-tight sm:text-[2.05rem] lg:text-[2.3rem] 2xl:text-[2.6rem]">',
    '<h1 className="mt-4 text-[1.875rem] font-bold leading-[1.1] tracking-[-0.01em] min-[390px]:text-[2.25rem] sm:text-[2.25rem] lg:text-[2.3rem] lg:leading-[1.08] lg:tracking-tight 2xl:text-[2.6rem]">',
)

# ------------------------------------------------------------- description
rep(
    '<p className="mt-4 text-sm leading-6 text-blue-50/85 sm:text-base sm:leading-7">',
    '<p className="mt-4 text-base leading-7 text-blue-50/85 sm:leading-7">',
)

# ---------------------------------------------------------------- benefits
rep(
    '<ul className="grid min-w-0 gap-5 sm:grid-cols-3 lg:gap-5">',
    '<ul className="grid min-w-0 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-5">',
)

# -------------------------------------------------------------------- CTAs
# 60px tall at every width, and a tap state that does not depend on hover.
rep(
    'className="group h-14 w-full justify-start gap-3 rounded-xl border border-white/70 bg-white px-4 py-2 text-[#0b294d] shadow-[0_10px_26px_rgba(2,18,39,0.22),0_0_22px_rgba(56,189,248,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_16px_36px_rgba(2,18,39,0.36),0_0_30px_rgba(56,189,248,0.3)] focus-visible:ring-sky-300 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-15 sm:w-auto sm:px-5 [&_svg]:size-4"',
    'className="group h-15 w-full justify-start gap-3 rounded-xl border border-white/70 bg-white px-4 py-2 text-[#0b294d] shadow-[0_10px_26px_rgba(2,18,39,0.22),0_0_22px_rgba(56,189,248,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_16px_36px_rgba(2,18,39,0.36),0_0_30px_rgba(56,189,248,0.3)] focus-visible:ring-sky-300 active:translate-y-0 active:border-primary active:bg-primary active:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:px-5 [&_svg]:size-4"',
)
rep(
    'className="shrink-0 stroke-[2.2] text-primary transition-colors duration-200 group-hover:text-white motion-reduce:transition-none"',
    'className="shrink-0 stroke-[2.2] text-primary transition-colors duration-200 group-hover:text-white group-active:text-white motion-reduce:transition-none"',
)
rep(
    'className="text-xs font-medium leading-4 text-[#0b294d]/70 transition-colors duration-200 group-hover:text-blue-50/85 motion-reduce:transition-none"',
    'className="text-xs font-medium leading-4 text-[#0b294d]/70 transition-colors duration-200 group-hover:text-blue-50/85 group-active:text-blue-50/85 motion-reduce:transition-none"',
)

rep(
    'className="group h-14 w-full justify-start gap-3 rounded-xl border border-white/35 bg-white/[0.08] px-4 py-2 text-white shadow-[0_8px_22px_rgba(2,18,39,0.2)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-primary/90 hover:text-white hover:shadow-[0_14px_32px_rgba(2,18,39,0.3),0_0_26px_rgba(56,189,248,0.28)] focus-visible:ring-sky-300 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-15 sm:w-auto sm:px-5 [&_svg]:size-4"',
    'className="group h-15 w-full justify-start gap-3 rounded-xl border border-white/35 bg-white/[0.08] px-4 py-2 text-white shadow-[0_8px_22px_rgba(2,18,39,0.2)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-300/70 hover:bg-primary/90 hover:text-white hover:shadow-[0_14px_32px_rgba(2,18,39,0.3),0_0_26px_rgba(56,189,248,0.28)] focus-visible:ring-sky-300 active:translate-y-0 active:border-sky-300/70 active:bg-primary/90 active:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:px-5 [&_svg]:size-4"',
)
rep(
    'className="shrink-0 text-sky-300 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none"',
    'className="shrink-0 text-sky-300 transition-colors duration-200 group-hover:text-white group-active:text-white motion-reduce:transition-none"',
)

# ------------------------------------------------------- trial reassurance
rep(
    '<p className="mt-3 flex items-center gap-2 text-sm text-blue-100/80">',
    '<p className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-100/80 lg:mt-3 lg:justify-start">',
)

# ----------------------------------------------------------- product image
# 4:3 on phones with the framing pushed right, so the monitor fills nearly the
# full width instead of shrinking into a 16:9 letterbox. From sm the box takes
# the photograph's own ratio, which crops nothing. xl is untouched.
rep(
    '<div className="relative order-last aspect-[16/10] w-full sm:aspect-[16/9] xl:absolute xl:right-[1.5%] xl:top-1/2 xl:z-10 xl:order-none xl:aspect-[1672/941] xl:w-[72%] xl:-translate-y-[60%]">',
    '<div className="relative order-last mt-2 aspect-[4/3] w-full sm:mt-0 sm:aspect-[1672/941] xl:absolute xl:right-[1.5%] xl:top-1/2 xl:z-10 xl:order-none xl:aspect-[1672/941] xl:w-[72%] xl:-translate-y-[60%]">',
)
rep(
    'className="object-cover object-[72%_center] xl:object-center"',
    'className="object-cover object-[78%_center] sm:object-center"',
)

io.open(p, "w", encoding="utf-8", newline="").write(s)
print("mobile pass 1 applied")

import {
  ArrowDown,
  ArrowRight,
  Check,
  FileImage,
  ScanSearch,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const detectionModes = [
  {
    number: "01",
    title: "Image verification",
    description:
      "Check images for AI-generated content, deepfakes, and digital manipulation.",
    formats: "JPG · PNG · WebP · GIF",
    href: "/image-detect",
    action: "Verify an image",
    Icon: FileImage,
  },
  {
    number: "02",
    title: "Video verification",
    description:
      "Review video for AI-generated content with frame-by-frame analysis.",
    formats: "MP4 · WebM · AVI · MOV",
    href: "/video-detect",
    action: "Verify a video",
    Icon: Video,
  },
];

const projectHighlights = [
  { label: "UI polish", value: "3 updates" },
  { label: "Evidence flow", value: "Live" },
  { label: "Case tracking", value: "Ready" },
];

export default function PublicPortal() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8fb] text-[#17233d]">
      <header className="relative z-10 border-b border-slate-200/70 bg-[#f7f8fb]/90 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link to="/" className="flex items-center gap-3" aria-label="SATYA home">
            <img src={logo} alt="" className="h-10 w-10 object-contain" />
            <span className="text-sm font-extrabold tracking-[0.2em] text-[#17233d]">
              SATYA
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-7">
            <Link
              to="/image-detect"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-[#315be8] sm:inline"
            >
              Image check
            </Link>
            <Link
              to="/video-detect"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-[#315be8] sm:inline"
            >
              Video check
            </Link>
            <Link
              to="/image-detect"
              className="inline-flex items-center gap-2 rounded-full bg-[#315be8] px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-[#244bd0] sm:px-5 sm:text-sm"
            >
              Start a check <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28">
          <div className="absolute -left-48 top-12 -z-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#315be8] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#315be8]" />
              DIGITAL MEDIA VERIFICATION
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-[#17233d] sm:text-6xl lg:text-7xl">
              Look closer.
              <br />
              <span className="text-[#315be8]">Know more.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              A clear first step when a photo or video raises questions. Check
              digital media for signs of AI generation and manipulation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/image-detect"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#315be8] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-[#244bd0]"
              >
                Verify an image <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/video-detect"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#17233d] transition hover:border-slate-400 hover:bg-white"
              >
                <Video size={16} aria-hidden="true" /> Check a video
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {projectHighlights.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2.5 shadow-sm"
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#17233d]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-slate-200 pt-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-[#315be8]">
                <ShieldCheck size={18} aria-hidden="true" />
              </div>
              <p className="max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                Built to support careful review—not replace your own judgment.
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -right-5 -top-7 h-32 w-32 rounded-full border border-blue-200/70 sm:-right-9 sm:-top-10 sm:h-44 sm:w-44" />
            <div className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-cyan-200/40 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-[0_32px_90px_-38px_rgba(28,51,106,0.35)] sm:p-5">
              <div className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.5rem] bg-[#152443] p-6 text-white sm:min-h-[390px] sm:p-8">
                <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.24em] text-blue-200">
                    SATYA / MEDIA CHECK
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-slate-200">
                    READY
                  </span>
                </div>
                <div className="relative my-auto py-8">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] border border-blue-200/25 bg-blue-400/10 shadow-[0_0_70px_-20px_rgba(96,165,250,0.65)] sm:h-40 sm:w-40">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100/20 bg-gradient-to-br from-blue-400/25 to-cyan-300/10 sm:h-24 sm:w-24">
                      <ScanSearch
                        size={42}
                        strokeWidth={1.35}
                        className="text-blue-100"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold tracking-tight sm:text-xl">
                      A closer look at media
                    </p>
                    <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                      Choose an image or video to begin
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Image and video tools
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-slate-500">
                    01 — 02
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:-left-7">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#17233d]">
                  Simple to get started
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Select a media type
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="tools"
          className="border-y border-slate-200/80 bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-[#315be8]">
                  CHOOSE YOUR TOOL
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#17233d] sm:text-4xl">
                  What would you like to check?
                </h2>
              </div>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#315be8]"
              >
                How it works <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {detectionModes.map(
                ({ number, title, description, formats, href, action, Icon }) => (
                  <Link
                    key={number}
                    to={href}
                    className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-[#fbfcfe] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_60px_-35px_rgba(28,51,106,0.35)] sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#315be8] transition group-hover:bg-[#315be8] group-hover:text-white">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-slate-400">
                        {number} / 02
                      </span>
                    </div>
                    <div className="mt-8 flex flex-1 flex-col sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-[#17233d]">
                          {title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                          {description}
                        </p>
                      </div>
                      <span className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#315be8] sm:mt-0">
                        {action}
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="mt-5 border-t border-slate-200 pt-4 text-[11px] font-medium tracking-wide text-slate-400">
                      SUPPORTED FORMATS <span className="mx-1">·</span>{" "}
                      {formats}
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#315be8]">
              A CLEARER FIRST STEP
            </p>
            <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#17233d] sm:text-4xl">
              Verification should feel straightforward.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Choose the tool that fits your media, submit a file, and review
              the analysis. Results are there to inform—not make the decision
              for you.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose a format",
                text: "Start with an image or video check.",
              },
              {
                number: "02",
                title: "Submit your file",
                text: "Upload the media you want to review.",
              },
              {
                number: "03",
                title: "Review the result",
                text: "Use the analysis as one part of your assessment.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white/70 p-5 sm:p-6"
              >
                <span className="font-mono text-xs font-semibold tracking-widest text-[#315be8]">
                  {step.number}
                </span>
                <h3 className="mt-8 text-base font-semibold text-[#17233d]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#152443] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="SATYA home">
            <img src={logo} alt="" className="h-9 w-9 rounded-lg bg-white object-contain p-1" />
            <div>
              <span className="text-sm font-extrabold tracking-[0.2em]">
                SATYA
              </span>
              <p className="mt-1 text-xs text-slate-400">
                AI Evidence Integrity System
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/image-detect" className="transition hover:text-white">
              Image check
            </Link>
            <Link to="/video-detect" className="transition hover:text-white">
              Video check
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-slate-500 sm:px-8">
          © 2026 SATYA. Review digital media with care.
        </div>
      </footer>
    </div>
  );
}

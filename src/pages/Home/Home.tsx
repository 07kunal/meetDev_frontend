
import { ArrowRightIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.2),transparent_55%),radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_45%)]" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-24">
        <div className="animate-[fade-in_700ms_ease-out_both]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-info/30 bg-info/10 px-4 py-2 text-sm font-semibold text-info">
            <span className="h-2 w-2 rounded-full bg-info" />
            A better way to meet your people
          </div>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-base-content sm:text-6xl lg:text-7xl">
            Find your next <span className="text-primary">meaningful connection.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-base-content/70 sm:text-xl">
            MeetDev brings curious people together to share ideas, build friendships, and create something worth talking about.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/signup" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/20">
              Join MeetDev
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              I already have an account
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-base-content/60">
            <span className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5 text-primary" />
              Meet people who get it
            </span>
            <span className="flex items-center gap-2">
              <UserPlusIcon className="h-5 w-5 text-secondary" />
              Keep connections growing
            </span>
          </div>
        </div>

        <div className="animate-[fade-in_900ms_150ms_ease-out_both]">
          <div className="border-base-content/10 bg-base-200/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Your circle</p>
                <h2 className="mt-2 text-2xl font-bold text-base-content">Start with one hello.</h2>
              </div>
              <div className="rounded-2xl bg-base-100 p-3 text-primary shadow-sm">
                <UserGroupIcon className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-base-100 p-4">
                <div className="avatar placeholder">
                  <div className="w-12 rounded-full bg-warning text-warning-content"><span className="text-lg">A</span></div>
                </div>
                <div>
                  <p className="font-semibold">Aarav is looking for collaborators</p>
                  <p className="text-sm text-base-content/60">Product design · Bengaluru</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-base-100 p-4">
                <div className="avatar placeholder">
                  <div className="w-12 rounded-full bg-secondary text-secondary-content"><span className="text-lg">M</span></div>
                </div>
                <div>
                  <p className="font-semibold">Maya wants to share ideas</p>
                  <p className="text-sm text-base-content/60">Frontend engineering · Pune</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-base-content/10 pt-6 text-sm text-base-content/60">
              Thoughtful profiles. Genuine conversations. Room to grow.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

import { revealUp } from "./animations/motion";

import {
  FallingPetals,
  GoldDust,
  GoldShine,
  OrnateDivider,
} from "./components/Effects";

import SceneShell from "./components/SceneShell";

import logoImage from "./assets/sa-logo.jpg";
import receptionTemplate from "./assets/reception-template.jpg";
import receptionFull from "./assets/reception-full.jpeg";
import weddingTemplate from "./assets/wedding-template.png";
import weddingFull from "./assets/wedding-full.jpeg";

const weddingTarget = new Date("2026-11-20T10:30:00+05:30");
const mapsQuery =
  "Kishore Shubham Conventional Hall, Kalyandurgam Rd, opposite Bharath Petrolbunk, Rachanapalle, Anantapur, Andhra Pradesh 515006";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

const scenes = [
  { id: "logo", title: "SA", duration: 5400 },
  { id: "reception-card", title: "Reception", duration: 6800 },
  { id: "reception-photo", title: "Moment", duration: 6200 },
  { id: "wedding-card", title: "Wedding", duration: 6500 },
  { id: "wedding-photo", title: "Blessings", duration: 6200 },
  { id: "countdown", title: "Countdown", duration: 7200 },
  { id: "venue", title: "Venue", duration: 7800 },
  { id: "thanks", title: "Thanks", duration: 7200 },
];

// A much gentler "Ken Burns" style zoom than before. The previous zoom
// pulled in far enough that the couple's faces were cropped out of frame
// on both the reception and wedding photo scenes. This version only
// breathes the image from 1.0 -> 1.06 scale over the full scene duration,
// combined with `object-position: center 22%` in CSS so the subjects stay
// in view the whole time.
const gentlePhotoZoom = {
  initial: { scale: 1 },
  animate: { scale: 1.06 },
  transition: { duration: 20, ease: "linear" },
};

function getTimeLeft() {
  const difference = Math.max(0, weddingTarget.getTime() - Date.now());
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function LogoIntro() {
  return (
    <SceneShell className="bg-paper">
      <FallingPetals density={0.65} />
      <GoldDust density={0.75} />
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-6">
        <motion.div
          className="logo-card"
          initial={{ opacity: 0, scale: 0.84, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <GoldShine />
          <img src={logoImage} alt="Sowjanya and Ankush SA monogram" className="logo-image" />
        </motion.div>
      </div>
    </SceneShell>
  );
}

function ReceptionTemplateScene() {
  return (
    <SceneShell className="bg-blush-mist">
      <FallingPetals density={0.8} />
      <GoldDust density={0.55} />

      <div className="invitation-layout">
        <motion.div className="template-card reception-card" variants={revealUp} custom={0.1}>
          <img src={receptionTemplate} alt="Reception invitation" className="template-image" />
        </motion.div>

        <motion.div
          className="side-copy"
          variants={revealUp}
          initial="initial"
          animate="animate"
          custom={0.55}
        >
          <p className="eyebrow">Reception</p>
          <div className="name-block">
            <h1>Sowjanya</h1>
            <span className="amp">&amp;</span>
            <h1>Ankush</h1>
          </div>
          <OrnateDivider />
          <p className="date-line">19 November 2026</p>
          <p className="time-line">7:00 PM Onwards</p>
        </motion.div>
      </div>
    </SceneShell>
  );
}

/*
  Photo scenes (reception + wedding) reuse the exact same
  .invitation-layout grid as the template card scenes: a small framed
  `.photo-card` sits next to the `.side-copy` caption, both centered over
  the decorative background (petals / gold dust / paper texture stay
  visible around the card instead of being hidden behind a full-bleed
  photo). Caption typography reuses .eyebrow/.side-copy h1/.amp so every
  scene in the deck shares one consistent font style.
*/

function ReceptionPhotoScene() {
  return (
    <SceneShell className="bg-blush-mist">
      <FallingPetals density={0.7} />
      <GoldDust density={0.6} />

      <div className="invitation-layout">
        <motion.div className="photo-card" variants={revealUp} custom={0.1}>
          <motion.img
            src={receptionFull}
            alt="Reception couple portrait"
            initial={gentlePhotoZoom.initial}
            animate={gentlePhotoZoom.animate}
            transition={gentlePhotoZoom.transition}
          />
        </motion.div>

        <motion.div
          className="side-copy"
          variants={revealUp}
          initial="initial"
          animate="animate"
          custom={0.55}
        >
          <p className="eyebrow">Reception Evening</p>
          <div className="name-block">
            <h1>Sowjanya</h1>
            <span className="amp">&amp;</span>
            <h1>Ankush</h1>
          </div>
          <OrnateDivider />
          <p className="date-line">19 November 2026</p>
          <p className="time-line">7:00 PM Onwards</p>
        </motion.div>
      </div>
    </SceneShell>
  );
}

function WeddingTemplateScene() {
  return (
    <SceneShell className="bg-ivory-royal">
      <FallingPetals density={0.7} />
      <GoldDust density={0.7} />
      <div className="invitation-layout wedding-layout">
        <motion.div
          className="side-copy wedding-copy"
          variants={revealUp}
          initial="initial"
          animate="animate"
          custom={0.25}
        >
          <p className="eyebrow">Wedding Ceremony</p>
          <div className="name-block">
            <h1>Sowjanya</h1>
            <span className="amp">&amp;</span>
            <h1>Ankush</h1>
          </div>
          <OrnateDivider />
          <p className="date-line">With the blessings of elders</p>
          <p className="time-line">Muhurtham : 10:30 AM</p>
        </motion.div>

        <motion.div
          className="template-card wedding-card"
          variants={revealUp}
          initial="initial"
          animate="animate"
          custom={0.1}
        >
          <img
            src={weddingTemplate}
            alt="Traditional wedding invitation template"
            className="template-image"
          />
          <motion.div
            className="ceremony-ribbon"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1 }}
          >
            <span className="ribbon-title">Wedding Ceremony</span>
            <span className="ribbon-time">Muhurtham 10:30 AM</span>
          </motion.div>
        </motion.div>
      </div>
    </SceneShell>
  );
}

function WeddingPhotoScene() {
  return (
    <SceneShell className="bg-ivory-royal">
      <FallingPetals density={0.7} />
      <GoldDust density={0.7} />

      <div className="invitation-layout wedding-layout">
        <motion.div
          className="side-copy wedding-copy"
          variants={revealUp}
          initial="initial"
          animate="animate"
          custom={0.25}
        >
          <p className="eyebrow">Wedding Blessings</p>
          <div className="name-block">
            <h1>Sowjanya</h1>
            <span className="amp">&amp;</span>
            <h1>Ankush</h1>
          </div>
          <OrnateDivider />
          <p className="date-line">20 November 2026</p>
          <p className="time-line">Muhurtham : 10:30 AM</p>
        </motion.div>

        <motion.div className="photo-card" variants={revealUp} custom={0.1}>
          <motion.img
            src={weddingFull}
            alt="Wedding couple portrait"
            initial={gentlePhotoZoom.initial}
            animate={gentlePhotoZoom.animate}
            transition={gentlePhotoZoom.transition}
          />
        </motion.div>
      </div>
    </SceneShell>
  );
}

function CountdownScene() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <SceneShell className="countdown-scene">
      <FallingPetals density={0.85} />
      <GoldDust density={0.8} />
      <motion.div className="countdown-panel" variants={revealUp} initial="initial" animate="animate" custom={0.2}>
        <p className="eyebrow">Counting Down To</p>
        <h2>The Wedding Ceremony</h2>
        <OrnateDivider />
        <div className="timer-grid">
          {units.map(([label, value], index) => (
            <motion.div
              className="timer-box"
              key={label}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.12, duration: 0.72 }}
            >
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
        <p className="date-line">20 November 2026, 10:30 AM</p>
      </motion.div>
    </SceneShell>
  );
}

function VenueScene() {
  return (
    <SceneShell className="venue-scene">
      <FallingPetals density={0.5} />
      <GoldDust density={0.9} />
      <motion.div className="venue-card" variants={revealUp} initial="initial" animate="animate" custom={0.15}>
        <span className="corner-accent top-left" aria-hidden="true" />
        <span className="corner-accent top-right" aria-hidden="true" />
        <span className="corner-accent bottom-left" aria-hidden="true" />
        <span className="corner-accent bottom-right" aria-hidden="true" />
        <div className="venue-copy">
          <p className="eyebrow">Venue</p>
          <h2>Kishore Shubham Conventional Hall</h2>
          <OrnateDivider />
          <address>
            <span className="pin-icon" aria-hidden="true">
              &#10022;
            </span>
            Kalyandurgam Rd,
            <br />
            opposite Bharath Petrolbunk,
            <br />
            Rachanapalle, Anantapur,
            <br />
            Andhra Pradesh 515006
          </address>
        </div>
        <motion.a
          className="qr-panel"
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open venue in Google Maps"
          initial={{ opacity: 0, rotateY: -18 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          <QRCodeSVG value={mapsUrl} size={150} bgColor="#fffaf3" fgColor="#6f1f24" level="H" includeMargin />
          <span>Scan for Directions</span>
        </motion.a>
      </motion.div>
    </SceneShell>
  );
}

function ThankYouScene({ onReplay }) {
  return (
    <SceneShell className="thank-scene">
      <FallingPetals density={0.75} />
      <GoldDust density={0.8} />
      <motion.div className="thank-card" variants={revealUp} initial="initial" animate="animate" custom={0.2}>
        <img src={logoImage} alt="SA monogram" />
        <p className="eyebrow">With Love</p>
        <h2>Thank You</h2>
        <OrnateDivider />
        <p>Your presence and blessings mean the world to us.</p>
        <button type="button" onClick={onReplay}>
          Replay Invitation
        </button>
      </motion.div>
    </SceneShell>
  );
}

function Scene({ id, onReplay }) {
  switch (id) {
    case "logo":
      return <LogoIntro />;
    case "reception-card":
      return <ReceptionTemplateScene />;
    case "reception-photo":
      return <ReceptionPhotoScene />;
    case "wedding-card":
      return <WeddingTemplateScene />;
    case "wedding-photo":
      return <WeddingPhotoScene />;
    case "countdown":
      return <CountdownScene />;
    case "venue":
      return <VenueScene />;
    default:
      return <ThankYouScene onReplay={onReplay} />;
  }
}

export default function App() {
  const [active, setActive] = useState(0);
  const audioRef = useRef(null);
  const bgMedia = new URL("./assets/pastel-wedding-reference.mp4", import.meta.url);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentScene = scenes[active];
  const isLastScene = active === scenes.length - 1;

  useEffect(() => {
    if (isLastScene) return undefined;
    const timer = window.setTimeout(
      () => setActive((index) => Math.min(index + 1, scenes.length - 1)),
      currentScene.duration,
    );
    return () => window.clearTimeout(timer);
  }, [active, currentScene.duration, isLastScene]);

  useEffect(() => {
    // try to autoplay background media (muted). many browsers require user gesture for unmuted audio.
    if (!audioRef.current) return;
    const play = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        setIsPlaying(false);
      }
    };
    play();
  }, []);

  const progressStyle = useMemo(
    () => ({ animationDuration: `${currentScene.duration}ms` }),
    [currentScene.duration],
  );

  return (
    <main className="app-shell">
      <audio ref={audioRef} loop src={String(bgMedia)} preload="auto" />
      <div className="player-controls" aria-hidden={false}>
        <button
          type="button"
          onClick={async () => {
            if (!audioRef.current) return;
            if (isPlaying) {
              audioRef.current.pause();
              setIsPlaying(false);
            } else {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
              } catch (e) {
                // ignore
              }
            }
          }}
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
        <button
          type="button"
          onClick={() => {
            const shareText = `You're invited — Sowjanya & Ankush wedding invitation: ${location.href}`;
            const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(url, "_blank");
          }}
        >
          Share
        </button>
        <button
          type="button"
          onClick={() => {
            // generate simple .ics save-date file
            const dt = new Date("2026-11-20T10:30:00+05:30");
            const dtStart =
              new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().replace(/[-:]/g, "").split(".")[0] +
              "Z";
            const dtEnd =
              new Date(dt.getTime() + 2 * 60 * 60 * 1000 - dt.getTimezoneOffset() * 60000)
                .toISOString()
                .replace(/[-:]/g, "")
                .split(".")[0] + "Z";
            const ics = [
              "BEGIN:VCALENDAR",
              "VERSION:2.0",
              "CALSCALE:GREGORIAN",
              "BEGIN:VEVENT",
              `DTSTART:${dtStart}`,
              `DTEND:${dtEnd}`,
              "SUMMARY:Sowjanya & Ankush - Wedding Ceremony",
              "DESCRIPTION:Wedding ceremony at Kishore Shubham Conventional Hall",
              "END:VEVENT",
              "END:VCALENDAR",
            ].join("\r\n");
            const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "sowjanya-ankush-wedding.ics";
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
        >
          Save Date
        </button>
      </div>

      <AnimatePresence mode="wait">
        <Scene key={currentScene.id} id={currentScene.id} onReplay={() => setActive(0)} />
      </AnimatePresence>

      <nav className="scene-nav" aria-label="Invitation scenes">
        {scenes.map((scene, index) => (
          <button
            type="button"
            key={scene.id}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show ${scene.title}`}
          >
            <span>{scene.title}</span>
          </button>
        ))}
      </nav>

      {!isLastScene && <div key={currentScene.id} className="scene-progress" style={progressStyle} />}
    </main>
  );
}

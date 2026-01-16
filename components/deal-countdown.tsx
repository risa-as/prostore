"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Static target date (replace with desired date)
const TARGET_DATE = new Date("2026-01-18T00:00:00");

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const t = useTranslations('Deal');
  const tHome = useTranslations('Home');
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>(
    () => calculateTimeRemaining(TARGET_DATE)
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  if (!time) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">{t('loading')}</h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">{t('ended')}</h3>
          <p>
            {t('endedDescription')}
          </p>

          <div className="text-center">
            <Button asChild>
              <Link href="/search">{tHome('viewAll')}</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://utfs.io/f/Ionf4ykz8FsUhTGcnLs1qVPywM9lH8xDKguORmcQ2GB6iWjS"
            alt="promotion"
            width={300}
            height={200}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">{t('title')}</h3>
        <p>
          {t('description')}
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label={t('days')} value={time.days} />
          <StatBox label={t('hours')} value={time.hours} />
          <StatBox label={t('minutes')} value={time.minutes} />
          <StatBox label={t('seconds')} value={time.seconds} />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/search">{tHome('viewAll')}</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={
            "https://utfs.io/f/Ionf4ykz8FsUhTGcnLs1qVPywM9lH8xDKguORmcQ2GB6iWjS"
          }
          alt="promotion"
          width={300}
          height={200}
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4 w-full text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountdown;

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [geulah, setGeulah] = useState(0);
  const [highScores, setHighScores] = useState<number[]>([]);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ball = { x: 200, y: 200, dx: 2, dy: -2, r: 10 };
    let flipperLeft = { x: 100, y: 380, w: 60, h: 10 };
    let flipperRight = { x: 240, y: 380, w: 60, h: 10 };
    let keys: any = {};
    let balls: any = [ball];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      balls.forEach((b: any) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        b.x += b.dx;
        b.y += b.dy;

        if (b.x + b.r > canvas.width || b.x - b.r < 0) b.dx *= -1;
        if (b.y - b.r < 0) b.dy *= -1;
        if (b.y + b.r > canvas.height) {
          setHighScores((prev) => {
            const updated = [...prev, score].sort((a, b) => b - a).slice(0, 5);
            return updated;
          });
          setScore(0);
          setGeulah(0);
          b.x = 200; b.y = 200; b.dx = 2; b.dy = -2;
        }

        let fl = flipperLeft, fr = flipperRight;
        if (b.y + b.r > fl.y && b.x > fl.x && b.x < fl.x + fl.w) b.dy *= -1;
        if (b.y + b.r > fr.y && b.x > fr.x && b.x < fr.x + fr.w) b.dy *= -1;
      });

      ctx.fillStyle = "yellow";
      ctx.fillRect(flipperLeft.x, flipperLeft.y, flipperLeft.w, flipperLeft.h);
      ctx.fillRect(flipperRight.x, flipperRight.y, flipperRight.w, flipperRight.h);

      ctx.fillStyle = "green";
      ["Tzedakah", "Shabbat", "Torah", "Ahavat", "Tefillin", "Mezuzah", "Kashrut"].forEach((m, i) => {
        let x = 60 + i * 70, y = 100;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    }
    let interval = setInterval(draw, 20);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Moshiach Pinball</h1>
      <p className="mb-2">Score: {score} | Geulah Meter: {geulah}%</p>
      <canvas ref={canvasRef} width={500} height={400} className="border border-white rounded" />
      <h2 className="text-xl mt-4">High Scores</h2>
      <ul>
        {highScores.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}
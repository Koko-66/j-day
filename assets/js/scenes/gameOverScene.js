import { resetBulletUpdateState } from "../player.js";

const createGameOverScene = () => {
  // add game over screen
  return scene("game_over_scene", ({ final_score }) => {
    const gameOverMusic = play("game_over_music", { loop: false, volume: 0.4 });
    const gameOverBackground = add([
      sprite("game_over"),
      pos(0, 0),
      origin("topleft"),
      scale(1),
    ]);

    const score = add([
      text(`Final Score:${final_score}`, {
        size: 45,
        font: "sinko",
      }),
      color(rgb(255, 255, 255)),
      pos(135, 385),
    ]);

    function addButton(txt, p, f) {
      const btn = add([
        text(txt, {
          size: 48,
          font: "apl386o",
        }),

        pos(p),
        area({ cursor: "pointer" }),
        scale(1),
      ]);

      btn.onClick(f);

      btn.onUpdate(() => {
        if (btn.isHovering()) {
          const t = time() * 10;
          btn.color = rgb(
            wave(0, 255, t),
            wave(0, 255, t + 2),
            wave(0, 255, t + 4)
          );
          btn.scale = vec2(1.2);
        } else {
          btn.scale = vec2(1);
          btn.color = rgb(255, 255, 0);
        }
      });
    }

    addButton("Try Again", vec2(80, 500), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      gameOverMusic.pause();
      resetBulletUpdateState();
      go("game", { score: 0, livesLeft: 3 });
    });

    addButton("Quit", vec2(550, 500), () => {
      play("menu_select", { loop: false, volume: 1.0 });
      gameOverMusic.pause();
      play("hasta-la-vista",{ loop: false, volume: 0.8 });
      go("welcome");
    });

    // Toggle scene music
    let muted = false;

    onKeyPress("m", () => {
      if (muted == false) {
        gameOverMusic.pause();
        muted = true;
      } else {
        gameOverMusic.play();
        muted = false;
      }
    });

    // reset cursor to default at frame start for easier cursor management
    onUpdate(() => cursor("default"));

    onKeyPress("enter", () => {
      play("menu_select", { loop: false, volume: 0.5 });
      gameOverMusic.pause();
      go("game", { score: 0, livesLeft: 3 });
    });
  });
};

export default createGameOverScene;

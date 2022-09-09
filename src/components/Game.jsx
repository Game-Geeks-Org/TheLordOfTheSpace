import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const {
    unityProvider,
    isLoaded,
    unload,
    loadingProgression,
    addEventListener,
    removeEventListener,
    sendMessage
  } = useUnityContext({
    loaderUrl: "SSBuild/Build/web.loader.js",
    dataUrl: "SSBuild/Build/web.data",
    frameworkUrl: "SSBuild/Build/web.framework.js",
    codeUrl: "SSBuild/Build/web.wasm",
  });

  const handleGameOver = useCallback((score) => {
    setIsGameOver(true);
    setScore(score);
    console.log(` You've scored ${score} points.`)
  }, []);

  const handleGameStart = useCallback((score) => {
    // setIsGameOver(true);
    setScore(score);
    console.log(` You've scored ${score} points.`)
  }, []);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    addEventListener("GameStart", handleGameStart);
    return () => {
      unload();
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("GameStart", handleGameStart);
    };
  }, [addEventListener, removeEventListener, unload, handleGameOver, handleGameStart]);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
      <Unity
        className="unity"
        unityProvider={unityProvider}
        style={{
          width: "100%",
          aspectRatio: "16:9",
          overflow: "hidden",
        }}
      />
      {isGameOver === true && (
        <p style={{ color: "white" }}>{`Game Over You've scored ${score} points.`}</p>
      )}
    </div>
  );
}

export default Game
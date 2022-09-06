import logo from './logo.svg';
import './App.css';
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const App = () => {
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
    loaderUrl: "SSBuild/Build/webgl.loader.js",
    dataUrl: "SSBuild/Build/webgl.data",
    frameworkUrl: "SSBuild/Build/webgl.framework.js",
    codeUrl: "SSBuild/Build/webgl.wasm",
  });

  const handleGameOver = useCallback((score) => {
    setIsGameOver(true);
    setScore(score);
    console.log(` You've scored ${score} points.`)
  }, []);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default App;

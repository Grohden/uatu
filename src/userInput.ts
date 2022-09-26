export const userInputHandler = () => {
  const holdingRecord = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const switchHoldingRecord = (code: string, value: boolean) => {
    switch (code) {
      case "KeyW":
        holdingRecord.up = value;
        return;
      case "KeyA":
        holdingRecord.left = value;
        return;
      case "KeyS":
        holdingRecord.down = value;
        return;
      case "KeyD":
        holdingRecord.right = value;
        return;
    }
  };

  document.addEventListener("keydown", (event) => {
    switchHoldingRecord(event.code, true);
  });

  document.addEventListener("keyup", (event) => {
    switchHoldingRecord(event.code, false);
  });

  return holdingRecord;
};

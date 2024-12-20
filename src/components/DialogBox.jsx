import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DialogBox = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-sm:w-[95%] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">The Drench Game</DialogTitle>
          <DialogDescription className="text-black text-lg max-sm:text-md">
            Use the buttons to change the color. Drench the board with single
            color to win the game
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
import { useEffect, useRef } from "react";
import styled from "styled-components";

type DialogWrapperProps = {
  dialogTitle?: string;
  dialogDescription?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  maxWidth?: string;
};
const DialogWrapper = ({
  isOpen,
  onClose,
  children,
  dialogDescription,
  dialogTitle,
  width,
  maxWidth,
}: DialogWrapperProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (e.target === dialogRef.current) {
      if (isOpen && dialogRef.current.open) {
        onClose();
      }
    }
  };
  return (
    <StyledDialog
      ref={dialogRef}
      aria-labelledby="dialogTitle"
      aria-describedby="dialogDescription"
      onClick={(e) => handleClick(e)}
      width={width}
      maxWidth={maxWidth}
    >
      <SDialogContent>
        <SDialogHeader>
          {dialogTitle && (
            <SDialogTitle id="dialogTitle">{dialogTitle}</SDialogTitle>
          )}
          {dialogDescription && (
            <SDialogDescription id="dialogDescription">
              {dialogDescription}
            </SDialogDescription>
          )}
        </SDialogHeader>
        <SDialogMain>{children}</SDialogMain>
        <SDialogFooter>
          <CloseButton aria-label="ダイアログを閉じる" onClick={onClose}>
            閉じる
          </CloseButton>
        </SDialogFooter>
      </SDialogContent>
    </StyledDialog>
  );
};

export default DialogWrapper;

const StyledDialog = styled.dialog<{
  width?: string;
  maxWidth?: string;
}>`
  border: none;
  border-radius: 10px;
  min-width: 340px;
  width: ${({ width }) => (width ? width : "88%")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "860px")};
  margin: auto;

  &::backdrop {
    width: 100%;
    min-height: 100svh;
    background-color: black;
    opacity: 0.5;
  }
`;
const SDialogContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  padding: 1rem;
`;

const SDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;
`;

const SDialogTitle = styled.h1`
  font-size: 1.5rem;
`;
const SDialogDescription = styled.h1`
  font-size: 1rem;
  font-weight: normal;
  color: #7e7e7e;
`;
const CloseButton = styled.button`
  transition: background-color 0.3s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const SDialogMain = styled.div``;

const SDialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

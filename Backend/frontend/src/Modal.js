import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor:"white",
  color: 'red',
  opacity: 0.9,
  zIndex: 1000,
  width: '90vw',
  maxWidth: '800px',
  height: '80vh',
  overflowY: 'auto',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 999,
};

const CLOSE_BUTTON_STYLE = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 1001,
  fontSize: '1.8rem',
  background: 'transparent',
  color: 'red',
  fontweight: 'bold',
  cursor: 'pointer',
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button style={CLOSE_BUTTON_STYLE} onClick={onClose}>✕</button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}

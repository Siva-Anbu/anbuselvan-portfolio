const content = (
  <>
    <div
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483646,
        backgroundColor: 'rgba(0,0,0,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Image Wrapper */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100vw',
          height: '100vh',
          padding: '60px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          key={img.url}
          src={img.url}
          alt={img.alt}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        />

        <div
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
          }}
        />
      </div>

      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{ ...btn, top: '16px', right: '16px' }}
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            ...btn,
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          ‹
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            ...btn,
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          ›
        </button>
      )}

      {/* Counter */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2147483647,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.2em',
        }}
      >
        {String(index + 1).padStart(2, '0')} /{' '}
        {String(images.length).padStart(2, '0')}
      </div>
    </div>

    {/* Copyright overlay */}
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '16px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.4)',
        zIndex: 2147483647,
        pointerEvents: 'none',
      }}
    >
      © Anbuselvan Sivaraju
    </div>
  </>
);
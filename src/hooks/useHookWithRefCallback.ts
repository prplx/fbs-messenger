import { useRef, useCallback } from 'react';

export default (handler: () => void) => {
  const ref = useRef<Element>();

  const scrollToBottom = () => {
    if (ref && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const setRef = useCallback((node: Element | null) => {
    if (ref && ref.current) {
      ref.current.removeEventListener('scroll', handler);
    }

    if (node) {
      node.addEventListener('scroll', handler);
    }

    ref.current = node || undefined;
  }, []);

  return [setRef, scrollToBottom] as const;
};

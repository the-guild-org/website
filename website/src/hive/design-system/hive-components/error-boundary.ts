"use client";

import { Component } from "react";

type State = { hasError: boolean };

export class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  State
> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // eslint-disable-next-line no-console -- error logging
    console.error(error);
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: { componentStack: string }) {
    // eslint-disable-next-line no-console -- error logging
    console.error(error, info);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

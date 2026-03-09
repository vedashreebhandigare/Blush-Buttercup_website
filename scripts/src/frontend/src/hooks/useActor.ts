import { useState, useEffect } from "react";
import { type backendInterface, createActorWithConfig } from "../config";

let actorPromise: Promise<backendInterface> | null = null;

export function useActor() {
    const [actor, setActor] = useState<backendInterface | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!actorPromise) {
            actorPromise = createActorWithConfig();
        }

        actorPromise
            .then((a) => {
                setActor(a);
                setLoading(false);
            })
            .catch((e) => {
                setError(e instanceof Error ? e : new Error(String(e)));
                setLoading(false);
            });
    }, []);

    return { actor, error, loading };
}

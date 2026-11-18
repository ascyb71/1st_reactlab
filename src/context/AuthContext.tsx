import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
estConnecte: boolean;
connexion: () => void;
deconnexion: () => void;
}

const AuthContext = createContext<AuthContextType>({
estConnecte: false,
connexion: () => {},
deconnexion: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [estConnecte, setEstConnecte] = useState(false);

const connexion = () => setEstConnecte(true);
const deconnexion = () => setEstConnecte(false);

return (
<AuthContext.Provider value={{ estConnecte, connexion, deconnexion }}>
    {children}
</AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
export default function ReactOdinFun(children: any, claims: string[], allegiance: string, fallBack: any) {
    if (claims.indexOf(allegiance) > -1) {
        return children;
    } else {
        return fallBack;
    }
}
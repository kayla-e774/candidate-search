// TODO: Create an interface for the Candidate objects returned by the API
export default interface ICandidate {
    name: string;
    username: string; // always exists
    location: string;
    avatarUrl: string; // always exists
    email: string;
    htmlUrl: string; // always exists
    company: string;
    bio: string;
}
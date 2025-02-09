import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import ICandidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [allUserInfo, setUserInfo] = useState<ICandidate[]>([] as ICandidate[]);
  const [currentUser, setCurrentUser] = useState<ICandidate>({} as ICandidate);
  const [dropUser, setDropUser] = useState(false);
  const [savedCandidates, setSavedCandidates] = useState<ICandidate[]>(
    () => JSON.parse(localStorage.getItem('savedCandidates') ?? '[]')
  )
  
  useEffect(() => {
    async function getUserInfo() {
      const candidates = await searchGithub();
      const allInfo: ICandidate[] = [];
    
      for (const candidate of candidates) {
        const candidateInfo = await searchGithubUser(candidate.login);
        // console.log(candidateInfo);
        if(candidateInfo) {
          const cInfo: ICandidate = {
            name: candidateInfo.name,
            username: candidateInfo.login,
            location: candidateInfo.location,
            avatarUrl: candidateInfo.avatar_url,
            email: candidateInfo.email,
            htmlUrl: candidateInfo.html_url,
            company: candidateInfo.company,
            bio: candidateInfo.bio
          };
          allInfo.push(cInfo);
          setUserInfo(allInfo);
          setCurrentUser(allInfo[0]);
        }
      }
    }
    getUserInfo();
  }, [])

  useEffect(() => {
    setCurrentUser(allUserInfo[1]);
    setUserInfo(allUserInfo.slice(1));
  }, [dropUser])

  useEffect (() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates))
  }, [savedCandidates])

  const handleAdd = () => {
    const newSavedCandidates = [...savedCandidates, currentUser];
    setSavedCandidates(newSavedCandidates);
    setDropUser(!dropUser);
  }

  const handleReject = () => {
    setDropUser(!dropUser);
  }

  return (
    <>
      <h1>Candidate Search</h1>
      { allUserInfo.length !== 0 ? (
        <>
          <div className="card">
            <img className="card-img-top" src={currentUser.avatarUrl} alt="profile picture"></img>
            <div className="card-body">
              <h5 className="card-title">{currentUser.username}</h5>
              {currentUser.name ? (<p className="card-text">Name: {currentUser.name}</p>): null}
              {currentUser.bio ? (<p className="card-text">Bio: {currentUser.bio}</p>): null}
              {currentUser.location ? (<p className="card-text">Location: {currentUser.location}</p>): null}
              {currentUser.email ? (<p className="card-text">Email: <a href={"mailto:"+currentUser.email}>{currentUser.email}</a></p>): null}
              {currentUser.company ? (<p className="card-text">Company: {currentUser.company}</p>): null}
              {currentUser.htmlUrl ? (<p className="card-text">URL: <a href={currentUser.htmlUrl} target="_blank">{currentUser.htmlUrl}</a></p>): null}
            </div>
          </div>
          <div>
            <button onClick={handleAdd}>+</button>
            <button onClick={handleReject}>-</button>
          </div>
        </>
      ) : (
        <h3>No More Candidates Available. Refresh for more options.</h3>
      )}
    </>
  );
};

export default CandidateSearch;

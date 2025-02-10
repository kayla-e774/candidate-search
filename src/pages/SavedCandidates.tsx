import { useState, useEffect } from 'react';
import ICandidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<ICandidate[]>(
    () => JSON.parse(localStorage.getItem('savedCandidates') ?? '[]')
  )

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates))
  }, [savedCandidates])

  const handleReject = (username: string) => {
    console.log("- clicked");
    const newCandidates = savedCandidates.filter(candidate => candidate.username !== username);
    setSavedCandidates(newCandidates);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      { savedCandidates.length !== 0 ? (
        <>
          <div className="container">
            <table className="table table-striped table-dark table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Email</th>
                  <th scope="col">Company</th>
                  <th scope="col">Bio</th>
                  <th scope="col">Reject</th>
                </tr>
              </thead>
              <tbody>
                { savedCandidates.map((candidate) => (
                  <tr key={candidate}>
                    <td>
                      <img className="img-thumbnail img-fluid" src={candidate.avatarUrl}></img>
                    </td>
                    <td>
                      <p>{candidate.username}</p>
                      { candidate.name ? (
                          <p>({candidate.name})</p>
                        ) : null
                      }
                    </td>
                    <td>
                      { candidate.location ? (
                          <p>{candidate.location}</p>
                        ) : null
                      }
                    </td>
                    <td>
                      { candidate.email ? (
                          <a href={"mailto:" + candidate.email}>{candidate.email}</a>
                        ) : null
                      }
                    </td>
                    <td>
                      { candidate.company ? (
                          <p>{candidate.company}</p>
                        ) : null
                      }
                    </td>
                    <td>
                      { candidate.bio ? (
                          <p>{candidate.bio}</p>
                        ) : null
                      }
                    </td>
                    <td>
                      <button onClick={() => handleReject(candidate.username)}>-</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3>No More Potential Candidates.</h3>
      )}
    </>
  );
};

export default SavedCandidates;

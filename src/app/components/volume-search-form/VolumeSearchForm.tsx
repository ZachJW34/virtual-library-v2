import React, { FormEvent, FunctionComponent, useState } from 'react';
import { ObjectIndexer } from '../../constants/utilTypes';
import { VolumeSearchOptionalParams, VolumeSearchParams } from '../../models/google-volumes';

type Props = {
  callback: (params: VolumeSearchParams) => void;
};

export const VolumeSearchFormComponent: FunctionComponent<Props> = props => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [subject, setSubject] = useState("");
  const [isbn, setIsbn] = useState("");
  const [lccn, setLccn] = useState("");
  const [oclc, setOclc] = useState("");

  const validateForm = (e: FormEvent) => {
    e.preventDefault();
    const optionalParams: VolumeSearchOptionalParams & ObjectIndexer<string> = {
      intitle: title,
      inauthor: author,
      inpublisher: publisher,
      subject: subject,
      isbn: isbn,
      lccn: lccn,
      oclc: oclc
    };
    const volumeSearchParams: VolumeSearchParams = {
      q: search || "",
      ...Object.keys(optionalParams)
        .filter(key => !!optionalParams[key])
        .reduce(
          (acc: { [key: string]: string }, key) => ({
            ...acc,
            [key]: optionalParams[key]
          }),
          {}
        )
    };
    props.callback(volumeSearchParams);
  };

  return (
    <form>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="General search"
      />
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <input
        type="text"
        value={publisher}
        onChange={e => setPublisher(e.target.value)}
        placeholder="Publisher"
      />
      <input
        type="text"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <input
        type="text"
        value={isbn}
        onChange={e => setIsbn(e.target.value)}
        placeholder="ISBN"
      />
      <input
        type="text"
        value={lccn}
        onChange={e => setLccn(e.target.value)}
        placeholder="LCCN"
      />
      <input
        type="text"
        value={oclc}
        onChange={e => setOclc(e.target.value)}
        placeholder="OCLC"
      />
      <button type="submit" onClick={validateForm}>
        Search
      </button>
    </form>
  );
};

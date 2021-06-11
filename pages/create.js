import Link from "next/link";
import { useEffect, useState } from "react";
import baseurl from "../Helpers/baseurl";
const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await imageUpload();
      const res = await fetch(`${baseurl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          mediaUrl: url,
          description,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        M.toast({ html: "Failed,Please add all the fields", classes: "red" });
      } else {
        M.toast({ html: "Created Successfully", classes: "green" });
      }
    } catch (err) {
      consol.log(err);
    }
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "instagramphotos");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/instagramphotos/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const res2 = await res.json();
    return res2.url;
  };
  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <img
        className="responsive-img"
        src={media ? URL.createObjectURL(media) : ""}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="materialize-textarea"
      ></textarea>
      <button className="btn waves-effect waves-light" type="submit">
        Submit<i className="material-icons right">send</i>
      </button>
    </form>
  );
};

export default Create;

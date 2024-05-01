export const fetchUsers = async () => {
  const res = await fetch(
    "https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json"
  );
  const data = await res.json();
  return data;
};

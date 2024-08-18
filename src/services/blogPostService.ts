import db from '../prisma';
import {
  TBlogPost,
  TDraftBlogPost,
  TNewOrEditedBlogPost,
} from '../types/bloPostTypes';

// GET all blog posts
async function dbGetAllBlogPosts() {
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;
  let blogPosts: Array<TBlogPost> = [];

  try {
    blogPosts = await db.blogPost.findMany({
      select: {
        id: true,
        content: true,
        created_at: true,
        published_at: true,
        slug: true,
        title: true,
        updated_at: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
            author: {
              select: {
                first_name: true,
                last_name: true,
                role: true,
                username: true,
              },
            },
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    statusMsg = 'Blog posts retrieved successfully';
  } catch (err) {
    status = 500;
    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    data: blogPosts,
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// GET one blog post
async function dbGetBlogPost(id: number) {
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;
  let blogPost: TBlogPost | null = null;

  try {
    blogPost = await db.blogPost.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        published_at: true,
        slug: true,
        title: true,
        updated_at: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
            author: {
              select: {
                first_name: true,
                last_name: true,
                role: true,
                username: true,
              },
            },
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!blogPost) {
      statusMsg = 'Requested blog post was not found';
      status = 404;
    } else {
      statusMsg = 'Succesfully returned the blog post';
    }
  } catch (err) {
    status = 500;
    statusMsg = 'Failed to get the blog post';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    data: blogPost,
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// CREATE a blog post
async function dbCreateBlogPost(userId: number, data: TNewOrEditedBlogPost) {
  const { content, title } = data;
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;

  try {
    await db.blogPost.create({
      data: {
        author_id: userId,
        content,
        published_at: new Date(),
        slug: title.trim().replace(/ /, '-'),
        status: 'published',
        title,
      },
    });

    statusMsg = 'New blog post was successfully added to database';
  } catch (err) {
    status = 400;
    statusMsg = 'Failed to save the blog post to database';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// CREATE draft blog post
async function dbCreateDraftBlogPost(userId: number, data: TDraftBlogPost) {
  const { content, title } = data;
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;

  try {
    await db.blogPost.create({
      data: {
        author_id: userId,
        content: content ?? '',
        title: title ?? '',
      },
    });

    statusMsg = 'Draft successfully saved';
  } catch (err) {
    status = 400;
    statusMsg = 'Failed to saved the draft';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// UPDATE blog post
async function dbUpdateBlogPost(
  blogPostId: number,
  data: TNewOrEditedBlogPost,
) {
  const { content, title } = data;
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;

  try {
    await db.blogPost.update({
      where: {
        id: blogPostId,
      },
      data: {
        content: content,
        title: title,
        slug: title?.trim().replace(/ /, '-'),
      },
    });

    statusMsg = 'Blog post successfully edited';
  } catch (err) {
    status = 400;
    statusMsg = 'Failed to edit the blog post';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// UPDATE draft blog post
async function dbUpdateDraftBlogPost(blogPostId: number, data: TDraftBlogPost) {
  const { content, title } = data;
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;

  try {
    await db.blogPost.update({
      where: {
        id: blogPostId,
      },
      data: {
        content: content ?? '',
        title: title ?? '',
      },
    });

    statusMsg = 'Draft successfully updated';
  } catch (err) {
    status = 400;
    statusMsg = 'Failed to update the draft';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

// DELETE blog post
async function dbDeleteBlogPost(blogPostId: number) {
  let errorMsg = '';
  let statusMsg = '';
  let status = 200;

  try {
    await db.blogPost.delete({
      where: {
        id: blogPostId,
      },
    });

    statusMsg = 'Post successfully deleted';
  } catch (err) {
    status = 400;
    statusMsg = 'Failed to delete the post';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else {
      errorMsg = String(err);
    }
  }

  return {
    message: statusMsg,
    error: {
      message: errorMsg,
    },
    status,
  };
}

export {
  dbCreateBlogPost,
  dbCreateDraftBlogPost,
  dbDeleteBlogPost,
  dbGetAllBlogPosts,
  dbGetBlogPost,
  dbUpdateBlogPost,
  dbUpdateDraftBlogPost,
};
